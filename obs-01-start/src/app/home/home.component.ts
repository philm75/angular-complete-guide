import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    //this.firstObsSubscription = interval(1000).subscribe(count => {
    //  console.log(count);
    //});

    // Custom version of the above...
    const customObs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customObs.pipe(
      filter(data => {
        return data > 0;
      }),
      map((data:number) => {
      return 'Round ' + (data + 1);
    }))
    .subscribe(count => {
      console.log(count);
    },
    error => {
      console.log(error);
      alert(error.message);
    },
    () => console.log('Completed!'));
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
