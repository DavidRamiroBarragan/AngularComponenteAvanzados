import {AfterContentInit, Component, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {TabComponent} from 'app/tab/tab.component';
import {Tab} from '../tab/tab.interface';


@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {


    // @ContentChild(TabComponent) tab: TabComponent;
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    private tabClickSubscriptions: any[] = [];

    constructor() {
    }

    ngOnInit() {

    }

    ngAfterContentInit(): void {
         this.tabs.forEach((value) => {
             const subscription = value.onClick.subscribe(() => {
                console.log(`tab ${value.title} content click`);
            });
            this.tabClickSubscriptions.push(subscription);
        });
        this.selectTab(this.tabs.first);
    }

    ngOnDestroy(): void {
        if (this.tabClickSubscriptions) {
            this.tabClickSubscriptions.forEach(
                subscription => subscription.unsubscribe()
            );
        }
    }

    selectTab(tab: Tab) {
        this.tabs.forEach((data) => {
            data.isActive = false;
        });
        tab.isActive = true;

    }


}
