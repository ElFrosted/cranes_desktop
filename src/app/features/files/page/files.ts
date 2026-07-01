import { Component } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { File } from "../components/file/file";

@Component({
    selector: 'app-files',
    imports: [Card, File],
    templateUrl: './files.html',
    styleUrl: './files.scss',
})
export class Files {}
