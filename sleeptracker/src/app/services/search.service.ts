import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

  private apiKey = 'AIzaSyBdWNF-w_irW0rVHQlgbkJuueFq2bwPnOE'; //

  constructor(private http: HttpClient) {}

  async performSearch(query: string): Promise<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': this.apiKey,
    });
    const body = {
      "contents":[
        {"role": "user",
          "parts":[{"text": `assume you are a health and sleep advisor, please give me some suggestions on sleep and health in regarding to ${query} and  sleep`}]
        }
      ]
    };

    try {
      const response: any = await this.http.post(this.apiUrl, body, { headers }).toPromise();
      console.log(response);


      if (response && response.candidates && response.candidates.length > 0) {

        const firstCandidate = response.candidates[0];
        if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {

          const textResponse = firstCandidate.content.parts[0].text;
          return this.processResponse(textResponse);
        }
      }

      return [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  private processResponse(responseText: string): any[] {

    return [{ title: 'Related Information', content: responseText }];
  }
}
