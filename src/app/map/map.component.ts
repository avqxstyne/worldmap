import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent {

	private document = inject(DOCUMENT);

	classColor(countryArray: SVGPathElement, color: string) {
		let classNameOfElement = countryArray.classList.value;
		console.log(classNameOfElement)

		let itemsWithSameClass = this.document.getElementsByClassName(classNameOfElement) as HTMLCollectionOf<HTMLElement>;

		for (let i = 0; i < itemsWithSameClass.length; i++) {
			itemsWithSameClass[i].style.fill = color;
			
		}
	}

	ngOnInit() {
		const countries = this.document.getElementsByTagName('path')

		for (let i = 0; i < countries.length; i++) {
			if (countries[i].hasAttribute("class"))  {
				
				countries[i].addEventListener('mouseover', () => {
					this.classColor(countries[i], "blue")
				})
				countries[i].addEventListener("mouseout", () => {
					this.classColor(countries[i], "rgb(235,235,235)")
				})

			} else {
				countries[i].addEventListener('mouseover', () => {
					countries[i].style.fill = "blue";
				})
				countries[i].addEventListener('mouseout', () => {
					countries[i].style.fill = "rgb(235,235,235)";
				})
			}
		}	
	}
}
