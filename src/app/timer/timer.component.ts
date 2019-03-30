import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TimerService} from './timer.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
    providers: [TimerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

    @Output() onComplete = new EventEmitter<void>();
    @Input() init: number = 20;
    private countdownEndSubscription: Subscription = null;
    private countSourceSubscription: Subscription = null;
    public countdown: number = 0;


    constructor(public _timerService: TimerService,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._timerService.restartCountdown(this.init);
        this.countdownEndSubscription = this._timerService.countdownFinished$.subscribe(() =>
            this.onComplete.emit()
        );
        this.countSourceSubscription = this._timerService.countSource$.subscribe((data) => {
            this.countdown = data;
            this.cdRef.markForCheck();
        });
    }


    get progress(): number {
        return (this.init - this.countdown) / this.init * 100;
    }

    ngOnDestroy(): void {
        this._timerService.destroy();
        this.countdownEndSubscription.unsubscribe();
        this.countSourceSubscription.unsubscribe();
    }
}
