jest.mock("@comunica/query-sparql", () => {
  const mockQueryEngine = jest.fn(() => ({
    query: jest.fn(),
    resultToString: jest.fn(),
  }));
  return {
    QueryEngine: mockQueryEngine,
  };
});

import { QueryEngine } from "@comunica/query-sparql";
import DataService from "../Data/DataService";

describe("DataService - fetchChartData", () => {
  let mockChartStrategy;
  let dataService;

  beforeEach(() => {
    dataService = new DataService();
  });

  it("should fetch data and request chartStrategy.formatData when it received bindings", async () => {
    const query = "mockQuery";
    const source = "mockSource";

    const mockExecuteQuery = jest.fn().mockReturnValue([{ mock: "bindings" }]);
    DataService.prototype.executeQuery = mockExecuteQuery;

    const mockBindings = [{ field1: "value1" }, { field2: "value2" }];
    mockExecuteQuery.mockResolvedValue(mockBindings);

    mockChartStrategy = {
      formatData: jest.fn(),
    };

    const mockFormattedData = ["formattedData"];
    mockChartStrategy.formatData.mockReturnValue(mockFormattedData);

    const result = await dataService.fetchChartData(
      query,
      source,
      mockChartStrategy
    );

    expect(mockExecuteQuery).toHaveBeenCalledWith(query, source);
    expect(mockChartStrategy.formatData).toHaveBeenCalledWith(mockBindings);
    expect(result).toBe(mockFormattedData);
  });
});

describe("DataService - executeQuery", () => {
  let dataService;
  let mockEngine;

  beforeEach(() => {
    mockEngine = new QueryEngine();
    dataService = new DataService();
  });

  it("should return a toArray of bindings if resulttype is bindings", async () => {
    const query = "mockQuery";
    const source = "mockSource";

    const mockResult = {
      resultType: "bindings",
      values: [{ field1: "value1" }, { field2: "value2" }],
    };

    mockEngine.query.mockResolvedValue({
      resultType: "bindings",
      execute: jest.fn().mockResolvedValue({
        toArray: jest.fn().mockResolvedValue(mockResult.values),
      }),
    });

    const result = await dataService.executeQuery(query, source);

    expect(QueryEngine).toHaveBeenCalled();
    expect(result).toEqual(mockResult.values);
  });
});
