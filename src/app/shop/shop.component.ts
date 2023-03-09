import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('productList') productListElement !: ElementRef<HTMLElement>

  //page variables
  listOfItems: string[] = [];
  page: number = 1;

  constructor(public route: ActivatedRoute, public router: Router,public translate: TranslateService) { }

  ngOnInit(): void {
    for (let i = 0; i < 35; i++) {
      this.listOfItems.push("");
    }
    this.getPageParam();
  }

  //Search section
  public searchForKeyword(input: string) {
    let keywords = this.getKeywords(input);
    // Use keywords array to perform search
    var keywordsAsString = "";
    keywords.forEach(element => {
      keywordsAsString += element + "¿";
    });
    if (keywordsAsString.length < 1) {
      return;
    }
    keywordsAsString = keywordsAsString.substring(0, keywordsAsString.length - 1);

    this.router.navigate(['/shop/search'], { queryParams: { keywords: keywordsAsString } });
  }
  //turn inputs to string array and handle quotation mark
  public getKeywords(searchInput: string): string[] {
    const keywords: string[] = [];
    let currentKeyword = '';

    // Flag indicating whether we're currently inside a quoted phrase
    let insideQuote = false;

    for (let i = 0; i < searchInput.length; i++) {
      const char = searchInput[i];

      if (char === '"') {
        // Toggle the insideQuote flag
        insideQuote = !insideQuote;

        if (!insideQuote && currentKeyword) {
          // If we've just finished a quoted phrase, add it to the keywords array
          keywords.push(currentKeyword.trim());
          currentKeyword = '';
        }
      } else if (char === ' ' && !insideQuote) {
        // If we encounter a space and we're not inside a quoted phrase, add the current keyword to the array
        if (currentKeyword) {
          keywords.push(currentKeyword.trim());
          currentKeyword = '';
        }
      } else {
        // Append the current character to the current keyword
        currentKeyword += char;
      }
    }
    // Add the final keyword to the array if there is one
    if (currentKeyword) {
      keywords.push(currentKeyword.trim());
    }
    return keywords;
  }
  //Search section ends

  //Page section
  public getPageParam() {
    this.route.queryParams.subscribe(
      params => {
        const param = params['page'];
        var result = Number.parseInt(param);
        this.page = result;
      }
    )
  }
  public setPageParam() {
    this.router.navigate([], {
      queryParams: { page: this.page },
      queryParamsHandling: 'merge'
    })
    this.scroll(this.productListElement.nativeElement);
  }
  //Page section ends

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public selectCategories(category: string, subcategory: string) {
    console.log(category);
    console.log(subcategory);
  }

  public getTranslation(str:string){
    return this.translate.instant(str);
  }

}
