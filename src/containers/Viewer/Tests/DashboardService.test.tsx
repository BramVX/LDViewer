/**
 * @jest-environment jsdom
 */

import DashboardService from '../Data/DashboardService';
import SPARQLBuilder from '../Data/SPARQLBuilder';
import DataService from '../Data/DataService';

jest.mock('../Data/SPARQLBuilder');
jest.mock('../Data/DataService');

const localStorageMock = (() => {
    let store = {};
    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => (store[key] = value.toString())),
      clear: jest.fn(() => (store = {})),
    };
  })();

describe('DashboardService', () => {
  let dashboardService;
  let mockSetCards;
  let mockCards;
  let mockDataService;

    beforeEach(() => {
        mockSetCards = jest.fn();
        mockCards = [];
        mockDataService = new DataService();
        mockDataService.fetchChartData = jest.fn().mockResolvedValue('mockQueryResult');
        dashboardService = new DashboardService(mockCards, mockSetCards, mockDataService);

        jest.clearAllMocks();
    });

    it('should add a new chart to the dashboard' , async () => {
        //data to call function with
        const chartOptions = ['http://mockLink.com/x', 'http://mockLink.com/y'];
        const chartStrategy = { getChartType: jest.fn().mockReturnValue('bar') };
        const source = 'testSource';

        //Mocks for used functions in addChart
        const mockBuildQuery = jest.fn().mockReturnValue('mockQuery');
        SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
        localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

        //Call function
        await dashboardService.addChart({chartOptions, chartStrategy, source});

        //Check if functions were called correctly
        expect(mockBuildQuery).toHaveBeenCalledWith(chartOptions);
        expect(mockDataService.fetchChartData).toHaveBeenCalledWith('mockQuery', source, chartStrategy);
        expect(mockSetCards).toHaveBeenCalledWith([
        {
            chartType: 'bar',
            queryresult: 'mockQueryResult',
            x: 'x',
            y: 'y',
            query: 'mockQuery',
            id: 0,
            source,
        },
        ]);
    });
  
    it('should add a new chart to the dashboard with an existing card', async () => {
        //data to call function with
        const chartOptions = ['http://mockLink.com/x', 'http://mockLink.com/y'];
        const chartStrategy = { getChartType: jest.fn().mockReturnValue('bar') };
        const source = 'testSource';

        dashboardService.cards = [
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source,
            },
        ];

        //Mocks for used functions in addChart
        const mockBuildQuery = jest.fn().mockReturnValue('mockQuery');
        SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
        localStorageMock.getItem.mockReturnValue(JSON.stringify([
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source,
            },
        ]));

        //Call function
        await dashboardService.addChart({chartOptions, chartStrategy, source});
        
        expect(mockSetCards).toHaveBeenCalledWith([
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source,
            },
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 1,
                source,
            },
            ]);
    });

    it('should be able to edit a cards options, source and strategy', async () => {
        //data to call function with
        const chartOptions = ['http://mockLink.com/y', 'http://mockLink.com/x'];
        const chartStrategy = { getChartType: jest.fn().mockReturnValue('different') };
        const source = 'anotherSource';

        dashboardService.cards = [
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source: 'testSource',
            },
        ];

        //Mocks for used functions in addChart
        const mockBuildQuery = jest.fn().mockReturnValue('mockQuery');
        SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

        await dashboardService.editChart({chartOptions, chartStrategy, source, id: 0});

        expect(mockSetCards).toHaveBeenCalledWith([
            {
                chartType: 'different',
                queryresult: 'mockQueryResult',
                x: 'y',
                y: 'x',
                query: 'mockQuery',
                id: 0,
                source: 'anotherSource',
            },
        ]);
    });

    it('should be able to edit a cards query', async () => {
        //data to call function with
        const newQuery = 'newQuery';

        dashboardService.cards = [
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source: 'testSource',
            },
        ];

        //Mocks for used functions in addChart
        const mockBuildQuery = jest.fn().mockReturnValue('mockQuery');
        SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

        await dashboardService.editChartWithQuery({newQuery, id: 0});

        expect(mockSetCards).toHaveBeenCalledWith([
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'newQuery',
                id: 0,
                source: 'testSource',
            },
        ]);
    });

    it('should be able to delete a card', () => {
        dashboardService.cards = [
            {
                chartType: 'bar',
                queryresult: 'mockQueryResult',
                x: 'x',
                y: 'y',
                query: 'mockQuery',
                id: 0,
                source: 'testSource',
            },
        ];

        dashboardService.deleteChart({id: 0});

        expect(mockSetCards).toHaveBeenCalledWith([]);
    });
});
  