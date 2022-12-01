/**
 * Tom Mahoney
 * CIT360
 * Final Assignment - js
 *
 * Page is hosted, for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Final_Assignment/
 *
 */

/**
 * Priority queue ADT used to process nodes.
 */
class PriorityQueue{

    constructor(){
        this.values =[];
    }

    enqueue(val, priority){
        this.values.push({val, priority});
        this.sort()
    };

    dequeue(){
        return this.values.shift();
    };

    sort(){
        this.values.sort((a,b) => a.priority - b.priority);
    };
}

/**
 * For adjacencies I used an object map instead of multidimensional array.
 */
class Graph{

    constructor() {
        this.adjacency_list = {};
        this.num_vertices = 0;
        this.num_edges = 0;
        this.path_distance = 0;
    }

    add_vertex(v){
        if(!this.adjacency_list[v]) {
            this.adjacency_list[v] = [];
            this.num_vertices += 1;
        }
    }

    print(){
        for (const item in this.adjacency_list) {
            console.log("Index: ",item, ": ", this.adjacency_list[item]);
        }
    }

    add_edge(v1, v2, distance){
        this.adjacency_list[v1].push({node:v2, distance})
        this.adjacency_list[v2].push({node:v1, distance})
        this.num_edges += 1;
    }

    /**
     * Actual implementation of Djikstra algorithm.
     * @param start
     * @param end
     * @returns {*[]}
     */
    shortest_path(start, end){

        const nodes = new PriorityQueue(); //
        const dist = {};
        const prev = {};
        let path = []
        let shortest;

        for(let v in this.adjacency_list){

            if(v == start){ //OMG === to ==
                nodes.enqueue(v, 0);
                dist[v] = 0;
            }else{
                dist[v] = Infinity;
                nodes.enqueue(v, Infinity);
            }
            prev[v] = null;
        }

        //debug: console.log("nodes: ", nodes);

        while(nodes.values.length){
            shortest = nodes.dequeue().val;
            if (shortest == end){
                this.path_distance += dist[shortest]; //distance to final hop
                //debug: console.log(`shortest: ${shortest}, dist: ${dist[shortest]}`);
                //at destination

                while(prev[shortest]){
                    path.push(shortest);
                    shortest = prev[shortest];
                    this.path_distance += dist[shortest]; //distance to intermediate shortest hops
                    //debug console.log(`shortest: ${shortest}, dist: ${dist[shortest]}`);
                }
                //debug: console.log("p: ", path);
                break;
            }

            if(shortest || dist[shortest] != Infinity){

                for(let neighbor in this.adjacency_list[shortest]){

                    let next_node = this.adjacency_list[shortest][neighbor];

                    //console.log(next_node);

                    // calculate new distance to neighboring node
                    let candidate = dist[shortest] + next_node.distance;

                    let next_neighbor = next_node.node;

                    if(candidate < dist[next_neighbor]){
                        // updating new smallest distance to neighbor
                        dist[next_neighbor] = candidate;
                        // updating previous – How we got to neighbor
                        prev[next_neighbor] = shortest;
                        // enqueue in priority queue with new priority
                        nodes.enqueue(next_neighbor, candidate);


                    }
                }
            }

        }
        return path.concat(shortest).reverse();
    }

}

function test() {

    let graph = new Graph()

    graph.add_vertex("A")
    graph.add_vertex("B")
    graph.add_vertex("C")
    graph.add_vertex("D")
    graph.add_vertex("E")
    graph.add_vertex("F")
    graph.add_vertex("G")

    graph.add_edge("A", "B", 3);
    graph.add_edge("A", "C", 5);
    graph.add_edge("B", "E", 4);
    graph.add_edge("C", "D", 7);
    graph.add_edge("C", "F", 5);
    graph.add_edge("D", "E", 2);
    graph.add_edge("D", "F", 1);
    graph.add_edge("E", "F", 6);
    graph.add_edge("G", "F", 4);

    let path = graph.shortest_path("A", "G");

    console.log(path);

}

//test();
//make the Graph class available to other files
export { Graph };

