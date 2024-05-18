import { API_KEY, SPREADSHEET_ID } from './config';

export const loadSpreadsheetData = () => {
  return new Promise<string[][]>((resolve, reject) => {
    const gapi = (window as any).gapi;
    const REACT_APP_RANGE='Paciente A!AW2:BD1000'

    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: REACT_APP_RANGE,
        }).then((response: any) => {
          const rows = response.result.values;
          resolve(rows || []);
        }, (error: any) => {
          console.error("Error fetching spreadsheet data", error);
          reject(error);
        });
      });
    }

    gapi.load('client', initClient);
  });
};
