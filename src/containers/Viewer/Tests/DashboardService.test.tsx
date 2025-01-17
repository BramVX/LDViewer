/**
 * @jest-environment jsdom
 */

import DashboardService from "../Data/DashboardService";
import SPARQLBuilder from "../Data/SPARQLBuilder";
import DataService from "../Data/DataService";

jest.mock("../Data/SPARQLBuilder");
jest.mock("../Data/DataService");

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => (store[key] = value.toString())),
    clear: jest.fn(() => (store = {})),
  };
})();

describe("DashboardService", () => {
  let dashboardService;
  let mockSetCards;
  let mockCards;
  let mockDataService;

  beforeEach(() => {
    mockSetCards = jest.fn();
    mockCards = [];
    mockDataService = new DataService();
    mockDataService.fetchChartData = jest
      .fn()
      .mockResolvedValue("mockQueryResult");
    dashboardService = new DashboardService(
      mockCards,
      mockSetCards,
      mockDataService
    );

    jest.clearAllMocks();
  });

  it("should add a new chart to the dashboard", async () => {
    //data to call function with
    const chartOptions = ["1", "2"];
    

    const chartStrategy = {
        getChartType: jest.fn().mockReturnValue(
            "bar"
          ),
        buildQuery: jest.fn().mockImplementation((chartOptions) => {
          // Mock implementation logic for buildQuery
          return "mockQuery";
        }),
      };

    const source = "testSource";

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

    //Call function
    await dashboardService.addChart({ chartOptions, chartStrategy, source });

    //Check if functions were called correctly
    expect(chartStrategy.buildQuery).toHaveBeenCalledWith(chartOptions);
    expect(mockDataService.fetchChartData).toHaveBeenCalledWith(
      "mockQuery",
      source,
      chartStrategy
    );
    expect(mockSetCards).toHaveBeenCalledWith([
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        subject1: "1",
        subject2: "2",
        subject3: null,
        subject4: null,
        title: undefined,
        query: "mockQuery",
        id: 0,
        source,
      },
    ]);
  });

  it("should add a new chart to the dashboard with an existing card", async () => {
    //data to call function with
    const chartOptions = ["r", "e", "p", "o"];
    const chartStrategy = {
        getChartType: jest.fn().mockReturnValue(
            "bar"
          ),
        buildQuery: jest.fn().mockImplementation((chartOptions) => {
          // Mock implementation logic for buildQuery
          return "mockQuery";
        }),
      };
    const source = "testSource";

    dashboardService.cards = [
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        subject1: "1",
        subject2: "2",
        subject3: "3",
        subject4: "4",
        title: "title",
        query: "mockQuery",
        id: 0,
        source,
      },
    ];

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify([
        {
            chartType: "bar",
            queryresult: "mockQueryResult",
            subject1: "1",
            subject2: "2",
            subject3: "3",
            subject4: "4",
            title: "title",
            query: "mockQuery",
            id: 0,
            source,
        },
      ])
    );

    //Call function
    await dashboardService.addChart({ chartOptions, chartStrategy, source });

    expect(mockSetCards).toHaveBeenCalledWith([
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        subject1: "1",
        subject2: "2",
        subject3: "3",
        subject4: "4",
        title: "title",
        query: "mockQuery",
        id: 0,
        source,
      },
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        subject1: "r",
        subject2: "e",
        subject3: "p",
        subject4: "o",
        title: undefined,
        query: "mockQuery",
        id: 1,
        source,
      },
    ]);
  });

  it("should be able to edit a cards options, source, title and strategy", async () => {
    //data to call function with
    const chartOptions = ["http://mockLink.com/y", "http://mockLink.com/x"];
    const chartStrategy = {
        getChartType: jest.fn().mockReturnValue(
            "different"
          ),
        buildQuery: jest.fn().mockImplementation((chartOptions) => {
          return "mockQuery";
        }),
      };
    const source = "anotherSource";

    dashboardService.cards = [
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        x: "x",
        y: "y",
        query: "mockQuery",
        id: 0,
        source: "testSource",
      },
    ];

    //Mocks for used functions in addChart
    const mockBuildQuery = jest.fn().mockReturnValue("mockQuery");
    SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

    await dashboardService.editChart({
      chartOptions,
      chartStrategy,
      source,
      id: 0,
      title: "newTitle",
    });

    expect(mockSetCards).toHaveBeenCalledWith([
      {
        chartType: "different",
        queryresult: "mockQueryResult",
        subject1: "h",
        subject2: "h",
        subject3: null,
        subject4: null,
        title: "newTitle",
        query: "mockQuery",
        id: 0,
        source: "anotherSource",
      },
    ]);
  });

  it("should be able to edit a cards query", async () => {
    //data to call function with
    const newQuery = "newQuery";

    dashboardService.cards = [
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        x: "x",
        y: "y",
        query: "mockQuery",
        id: 0,
        source: "testSource",
      },
    ];

    //Mocks for used functions in addChart
    const mockBuildQuery = jest.fn().mockReturnValue("mockQuery");
    SPARQLBuilder.prototype.buildQuery = mockBuildQuery;

    await dashboardService.editChartWithQuery({ newQuery, id: 0 });

    expect(mockSetCards).toHaveBeenCalledWith([
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        x: "x",
        y: "y",
        query: "newQuery",
        id: 0,
        source: "testSource",
      },
    ]);
  });

  it("should be able to delete a card", () => {
    dashboardService.cards = [
      {
        chartType: "bar",
        queryresult: "mockQueryResult",
        x: "x",
        y: "y",
        query: "mockQuery",
        id: 0,
        source: "testSource",
      },
    ];

    dashboardService.deleteChart({ id: 0 });

    expect(mockSetCards).toHaveBeenCalledWith([]);
  });
});
