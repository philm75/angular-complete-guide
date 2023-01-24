import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // route.snapshot.param fine for initial loading of the component
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    // Params is an observable, fired when params change.
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'],
      this.user.name = params['name']
    });
  }

  // Angular will do this for you...
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
