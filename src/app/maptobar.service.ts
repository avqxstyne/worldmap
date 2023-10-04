import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MaptobarService {

	private messageSource = new BehaviorSubject({
		id: "",
		capitalCity: "",
		incomeLevel: { 
			id: "", 
			iso2code: "", 
			value: "" },
		iso2Code: "",
		latitude: "",
		longitude: "",
		name: "Country",
		region: { 
			id: "", 
			iso2code: "", 
			value: "" 
		}

	});
	currentMessage = this.messageSource.asObservable();

	constructor() { }

	changeMessage(message: any) {
		this.messageSource.next(message)
	}
}
