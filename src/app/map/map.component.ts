import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MaptobarService } from '../maptobar.service';
import { Subscription } from 'rxjs';
 
var isopackage = require("i18n-iso-countries");
isopackage.registerLocale(require("i18n-iso-countries/langs/en.json"));

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent {

	// @ts-ignore
	message: any;
	// @ts-ignore
	subscription: Subscription;
  
	private document = inject(DOCUMENT);

	constructor(
		private http:HttpClient,
		private data: MaptobarService
	) {}
	
	private url = 'https://api.worldbank.org/v2/country/';

	callServer(countryCode: string): Observable<string> {
		console.log("in callServer()");
		
		return this.http.get<string>(`${this.url}` + countryCode.toLowerCase() + `?format=json`);
	}
	
	// Sends a country object from api call to bar component
	getCountries(countryCode: any) {
		this.callServer(countryCode).subscribe((res)=> {
			//@ts-ignore
			this.newMessage(res[1][0]);
			//@ts-ignore
			console.log(res[1][0])
		})
	}

	classColor(countryArray: SVGPathElement, color: string) {
		let classNameOfElement = countryArray.classList.value;
		console.log(isopackage.getAlpha2Code(`${classNameOfElement}`, "en"))

		let itemsWithSameClass = this.document.getElementsByClassName(classNameOfElement) as HTMLCollectionOf<HTMLElement>;

		for (let i = 0; i < itemsWithSameClass.length; i++) {
			itemsWithSameClass[i].style.fill = color;
			
		}
	}

	// Color effect on hover
	ngOnInit() {

		this.subscription = this.data.currentMessage.subscribe(message => this.message = message)



		const countries = this.document.getElementsByTagName('path')

		for (let i = 0; i < countries.length; i++) {
			if (countries[i].hasAttribute("class"))  {
				
				countries[i].addEventListener('mouseover', () => {
					this.classColor(countries[i], "blue")
				})
				countries[i].addEventListener("mouseout", () => {
					this.classColor(countries[i], "rgb(235,235,235)")
				})
				countries[i].addEventListener('click', () => {


					let isocode = isopackage.getAlpha2Code(`${countries[i].getAttribute("class")}`, "en");
					this.getCountries(isocode)

					let sidebar = this.document.getElementById("sidebar") as HTMLElement;
					if (sidebar.classList.contains("slide-out")) {
						sidebar.classList.remove("slide-out");
					}
					if (!sidebar.classList.contains("slide-in")) {
						sidebar.classList.add("slide-in");
					}

				});


			} else {
				countries[i].addEventListener('mouseover', () => {
					countries[i].style.fill = "blue";

				})
				countries[i].addEventListener('mouseout', () => {
					countries[i].style.fill = "rgb(235,235,235)";
				})
				countries[i].addEventListener('click', () => {
					
					// This var is the countries' name converted to an iso 2 digit code
					let isocode = isopackage.getAlpha2Code(`${countries[i].getAttribute("name")}`, "en");
					
					// If it's undefined, which a few are, just use the ID as the code
					if (isocode === undefined) {
						this.getCountries(countries[i].getAttribute("id"))
					} else {
						this.getCountries(isocode)
					}


					// Sidebar animation
					let sidebar = this.document.getElementById("sidebar") as HTMLElement;
					if (sidebar.classList.contains("slide-out")) {
						sidebar.classList.remove("slide-out");
					}
					if (!sidebar.classList.contains("slide-in")) {
						sidebar.classList.add("slide-in");
					}
					
				
				})
			}
		}	
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	newMessage(text: any) {
		this.data.changeMessage(text)
	}
}
