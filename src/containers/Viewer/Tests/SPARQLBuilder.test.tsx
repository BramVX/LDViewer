import SPARQLBuilder from '../Data/SPARQLBuilder';

describe('SPARQLBuilder - buildQuery', () => {
    let builder;

    beforeEach(() => {
        builder = new SPARQLBuilder();
    });

    it('should build a query with 3 values', () => {
        const values = ['http://mockLink.com/x', 'http://mockLink.com/y', 'http://mockLink.com/z'];

        const result = builder.buildQuery(values);

        const expectedQuery = 
        `SELECT ?x ?y ?z 
        WHERE {
            ?o <http://mockLink.com/x> ?x;
                <http://mockLink.com/y> ?y;
                <http://mockLink.com/z> ?z;
        }
        ORDER BY ASC(?y)
        limit 5
        `;

        expect(result.replace(/\s/g, "")).toBe(expectedQuery.replace(/\s/g, ""));
    });

    it('should build a query with 2 values', () => {
        const values = ['http://mockLink.com/x', 'http://mockLink.com/y'];

        const result = builder.buildQuery(values);

        const expectedQuery = 
        `SELECT ?x ?y 
        WHERE {
            ?o <http://mockLink.com/x> ?x;
                <http://mockLink.com/y> ?y;
        }
        ORDER BY ASC(?y)
        limit 5
        `;

        expect(result.replace(/\s/g, "")).toBe(expectedQuery.replace(/\s/g, ""));
    });

    it('should build a query with 1 value', () => {
        const values = ['http://mockLink.com/x'];

        const result = builder.buildQuery(values);

        const expectedQuery = 
        `SELECT ?x 
        WHERE {
            ?o <http://mockLink.com/x> ?x;
        }
        limit 5
        `;

        expect(result.replace(/\s/g, "")).toBe(expectedQuery.replace(/\s/g, ""));
    });

    it('should build a query with a prefix', () =>{
        const values = ['http://mockLink.com/x', 'http://mockLink.com/prefix#y'];

        const result = builder.buildQuery(values);

        const expectedQuery = 
        `PREFIX pre0: <http://mockLink.com/prefix#>
        SELECT ?x ?y
        WHERE {
            ?o <http://mockLink.com/x> ?x;
                pre0:y ?y;
        }
        ORDER BY ASC(?y)
        limit 5
        `;

        expect(result.replace(/\s/g, "")).toBe(expectedQuery.replace(/\s/g, ""));

    });

    it('should build a query with two prefixes', () =>{
        const values = ['http://mockLink.com/prefix#x', 'http://mockLink.com/prefix#y'];

        const result = builder.buildQuery(values);

        const expectedQuery = 
        `PREFIX pre0: <http://mockLink.com/prefix#>
        SELECT ?x ?y
        WHERE {
            ?o pre0:x ?x;
                pre0:y ?y;
        }
        ORDER BY ASC(?y)
        limit 5
        `;

        expect(result.replace(/\s/g, "")).toBe(expectedQuery.replace(/\s/g, ""));
    });
});