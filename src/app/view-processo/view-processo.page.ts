
// import { Component, inject, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IonicModule, Platform } from '@ionic/angular';
// import { DataService, Processo } from '../services/data.service';

// @Component({
//   selector: 'app-view-processo',
//   templateUrl: './view-processo.page.html',
//   styleUrls: ['./view-processo.page.scss'],
//   standalone: false,
// })
// export class ViewProcessoPage implements OnInit {
//   public processo!: Processo;
//   private data = inject(DataService);
//   private activatedRoute = inject(ActivatedRoute);
//   private platform = inject(Platform);

//   constructor() {}

//   ngOnInit() {
//     const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
//     this.processo = this.data.getProcessoById(parseInt(id, 10));
//   }

//   getBackButtonText() {
//     const isIos = this.platform.is('ios')
//     return isIos ? 'Inbox' : '';
//   }
// }
