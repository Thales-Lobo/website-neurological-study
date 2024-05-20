import { API_KEY, SPREADSHEET_ID } from './config';

// Define the ranges for the date column and the main data range in the spreadsheet
const SPREADSHEET_DATE_VALUE_RANGE = 'Paciente A!A4:A20';
const SPREADSHEET_DATA_RANGE = 'Paciente A!AW4:BD20';

/**
 * Load data from a Google Sheets spreadsheet.
 * This function fetches data from two specified ranges and combines them.
 * 
 * @returns {Promise<string[][]>} - A promise that resolves to a 2D array of strings representing the combined data.
 */
export const loadSpreadsheetData = async (): Promise<string[][]> => {
  await loadGapi();
  const gapi = (window as any).gapi;

  try {
    // Initialize the gapi client
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    });

    // Fetch data from the date column range
    const responseDate = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SPREADSHEET_DATE_VALUE_RANGE,
    });
    console.log(`responseDate: ${responseDate.result.values}`);

    // Fetch data from the main data range
    const responseData = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SPREADSHEET_DATA_RANGE,
    });
    console.log(`responseData: ${responseData.result.values}`);

    // Extract values from the responses
    const dateValues: string[][] = responseDate.result.values || [];
    const dataValues: string[][] = responseData.result.values || [];

    // Combine the two datasets
    const combinedData: string[][] = dateValues.map((dateRow, index) => [
      dateRow[0], ...(dataValues[index] || [])
    ]);

    // Filter out rows that are completely empty
    const filteredData = combinedData.filter(row => row.some(cell => cell !== ''));

    return filteredData;

  } catch (error) {
    console.error("Error fetching spreadsheet data", error);
    throw error;
  }
};

/**
 * Ensure the gapi client library is loaded before initializing the client.
 * 
 * @returns {Promise<void>} - A promise that resolves when the gapi client library is loaded.
 */
export const loadGapi = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    const gapi = (window as any).gapi;
    gapi.load('client', resolve);
  });
};
