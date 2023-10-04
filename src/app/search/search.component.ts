import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {inject} from '@angular/core'

var isopackage = require("i18n-iso-countries");
isopackage.registerLocale(require("i18n-iso-countries/langs/en.json"));

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    private document = inject(DOCUMENT);


    ngOnInit() {
		const searchbar = this.document.getElementById("searchbar") as HTMLInputElement;
		const autocomplete = this.document.getElementById("autocomplete") as HTMLDivElement;

		const countries = Object.values(isopackage.getNames("en", {select: "official"}) as Object);


		searchbar.addEventListener('input', () => {
			let matches = []
			autocomplete.textContent = ""

			for (let i = 0; i < countries.length; i++) {
				if (countries[i].includes(searchbar.value)) {
					let node = this.document.createElement('button');
					node.classList.add("dynamic-button");
					node.innerHTML = `${countries[i]}`;
					autocomplete.appendChild(node);
				}
				
			}
		})
    }
}
