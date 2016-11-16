import {Component} from '@angular/core';

@Component({
    selector: 'profile-data-component',
    templateUrl: './app/fe-core/components/articles/profile-data/profile-data.component.html',
    inputs: ['articleData', 'articleType', 'articleSubType', 'index', 'imageLinks']
})

export class ProfileDataComponent {
}