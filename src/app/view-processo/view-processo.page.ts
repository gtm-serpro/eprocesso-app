import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Processo } from '../services/models/processo.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-view-processo',
  templateUrl: './view-processo.page.html',
  styleUrls: ['./view-processo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ViewProcessoPage implements OnInit {

  processo?: Processo;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.processo = this.dataService.getProcessoById(id);
  }

  getBackButtonText() {
    return 'Voltar';
  }
}

