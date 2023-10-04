import { Component } from '@angular/core';
import { MaptobarService } from '../maptobar.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import {inject} from '@angular/core'

@Component({
	selector: 'app-bar',
	templateUrl: './bar.component.html',
	styleUrls: ['./bar.component.scss']
})
export class BarComponent {

	// @ts-ignore
	message: any;
	// @ts-ignore
	subscription: Subscription;
	constructor(private data: MaptobarService) {}

	private document = inject(DOCUMENT);


	ngOnInit() {
		this.subscription = this.data.currentMessage.subscribe(message => this.message = message);		

		// animations
		const button = this.document.getElementById("sidebar-button") as HTMLButtonElement;
		const sidebar = this.document.getElementById("sidebar") as HTMLElement;

		button.addEventListener('click', () => {
			if (sidebar.classList.contains("slide-in")) {
				sidebar.classList.remove("slide-in");
			}
			if (!sidebar.classList.contains("slide-out")) {
				sidebar.classList.add("slide-out");
			}
		})
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	

}
