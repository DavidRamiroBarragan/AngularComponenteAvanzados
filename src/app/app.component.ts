import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    OnDestroy,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {SimpleAlertViewComponent} from './simple-alert-view/simple-alert-view.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    public isAddTimerVisible: boolean = false;
    public time: number = 0;
    public timers: Array<number> = [];
    private timeoutClear: any;
    // @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;

    @ViewChild('timerInput') timeInput: ElementRef;
    @ViewChild('alert', {read: ViewContainerRef}) alert: ViewContainerRef;
    private simpleAlert: ComponentRef<SimpleAlertViewComponent>;

    constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
        this.timers = [3, 85, 170];
    }

    ngAfterViewInit() {
        this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'Enter seconds');
        this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
        // this.alerts.forEach((item) => {
        //     if (!item.title) {
        //         item.title = 'Hola';
        //         item.message = 'Que ases';
        //     }
        // });
        // this.cdRef.detectChanges();
    }

    ngAfterContentInit(): void {

        // this.simpleAlertView.show();
        // this.simpleAlertView.title = 'Hi';
        // this.simpleAlertView.message = 'Helow, What do you do?';
    }

    ngOnDestroy(): void {
        clearTimeout(this.timeoutClear);
    }

    public showAddTimer() {
        this.isAddTimerVisible = true;
        this.timeoutClear = setTimeout(
            () => this.renderer.selectRootElement(this.timeInput.nativeElement).focus(), 250
        );
    }

    public hideAddTimer() {
        this.isAddTimerVisible = false;
    }

    public submitAddTimers() {
        this.timers.push(this.time);
        this.hideAddTimer();
    }

    public showEndTimerAlert() {
        // Creacón de un componente de manera dinámica
        const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
        this.simpleAlert = this.alert.createComponent(alertFactory);
        this.simpleAlert.instance.title = 'Timer Ended';
        this.simpleAlert.instance.message = 'Your countdown has finished';
        this.simpleAlert.instance.onDismiss.subscribe(() =>this.simpleAlert.destroy());
        this.simpleAlert.instance.show();
    }

}
