import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute          
    ) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.allowEdit = this.route.queryParams['allowEdit'] === '1' ? true : false;
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe(
      (params:Params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    )

    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    )
    
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
