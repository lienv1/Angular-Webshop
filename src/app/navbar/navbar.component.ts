import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;

  @ViewChild('languageSelector')
  languageSelector !: ElementRef<HTMLSelectElement>

  constructor(public translate: TranslateService, public route: ActivatedRoute, public router: Router) {  // Register translation languages
    translate.addLangs(['en', 'de', 'fr', 'zh', 'vn']);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //this.setLanguageInParamOnLoad();
    this.setLanguageFromStorage();
  }

  //On load
  public setLanguageFromStorage() {
    let language = localStorage.getItem('lang');
    if (language != null) {
      this.translateLanguageTo(language);
      this.languageSelector.nativeElement.value = language;
    }
    else {
      this.translateLanguageTo("de");
      this.languageSelector.nativeElement.value = "de";
    }
  }

  //Language section
  //Switch language
  public translateLanguageTo(lang: string) {
    this.translate.use(lang);
    this.updateLanguageInLocalStorage(lang);
  }
  //Update language in localStorage
  public updateLanguageInLocalStorage(lang: string) {
    localStorage.setItem('lang', lang);
  }
  //Language section ends

}
