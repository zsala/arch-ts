import * as graphviz from "graphviz";
import { ClassInfo } from "./domain";
import { ClassType } from "./domain/class.info";

export default class GraphRenderer {
  private graph: graphviz.Graph;
  private scriptDirectory: string;
  private nodeMap: Record<string, graphviz.Node>;
  private renderedDependencies: Set<string>; // Set to track rendered dependencies

  constructor() {
    this.graph = graphviz.digraph("G");
    this.graph.setNodeAttribut("shape", "record"); // Set default node shape
    this.scriptDirectory = __dirname;
    this.nodeMap = {};
    this.renderedDependencies = new Set(); // Initialize the set
  }

  private renderNode(id: string, value: string): graphviz.Node {
    const node = this.graph.addNode(id);

    // Set the label for the node
    node.set("shape", "record");
    node.set("label", value);

    return node;
  }

  private renderCompositionConnection(
    sourceNode: any,
    compositionNode: any
  ): void {
    const compositionEdge = this.graph.addEdge(sourceNode, compositionNode);
    compositionEdge.set("dir", "both");
    compositionEdge.set("arrowtail", "diamond");
    compositionEdge.set("arrowhead", "none");
  }

  private renderInterfaceConnection(implNode: any, interfaceNode: any): void {
    const interfaceEdge = this.graph.addEdge(implNode, interfaceNode);
    interfaceEdge.set("dir", "back");
    interfaceEdge.set("style", "dotted");
  }

  private renderDependencyConnection(sourceNode: any, targetNode: any): void {
    const dependencyEdge = this.graph.addEdge(sourceNode, targetNode);
    dependencyEdge.set("style", "dashed");
    dependencyEdge.set("arrowhead", "vee");
  }

  private toPascalCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public render(classInfoMap?: Record<string, ClassInfo>): void {
    if (!classInfoMap) {
      console.warn("No class information provided.");
      return;
    }

    // Create nodes for each class
    Object.entries(classInfoMap).forEach(([className, classInfo]) => {
      const isClass = classInfo.type === ClassType.CLASS;

      // Corrected label for interfaces with line break for interface name and class name
      let classLabel = isClass
        ? `{${className}|`
        : `{\\<\\<interface\\>\\>\\n${className}|`; // Adding \n for line break

      // Add properties if available
      if (classInfo.properties && classInfo.properties.length > 0) {
        classInfo.properties.forEach((property) => {
          classLabel += `- ${property.name}: ${property.type}\\l`;
        });
      }

      // Add a separator if there are properties and methods/constructor
      if (classInfo.properties.length > 0) {
        classLabel += "|"; // Add separator line
      }

      // Add constructor if available
      if (classInfo.constructorInfo) {
        const constructorParams =
          classInfo.constructorInfo.parameters.join(", ");
        classLabel += `+ constructor(${constructorParams})\\l`;
      }

      // Add a separator if there's a constructor and methods
      if (classInfo.constructorInfo && classInfo.functions && classInfo.functions.length > 0) {
        classLabel += "|"; // Add separator line
      }

      // Add class methods
      if (classInfo.functions) {
        classInfo.functions.forEach((func) => {
          const methodParams = func.parameters
            .map((param) => `${param.name}: ${param.type}`)
            .join(", ");
          classLabel += `+ ${func.name}(${methodParams}): ${func.returnType}\\l`;
        });
      }

      classLabel += "}";

      // Render the node and store it in the nodeMap
      const node = this.renderNode(className, classLabel);

      this.nodeMap[className] = node;
    });

    // Now handle relationships (composition, inheritance, interfaces)
    Object.entries(classInfoMap).forEach(([className, classInfo]) => {
      const sourceNode = this.nodeMap[className];

      // Handle inheritance (extends)
      if (classInfo.extends && this.nodeMap[classInfo.extends]) {
        const parentNode = this.nodeMap[classInfo.extends];
        this.renderInterfaceConnection(sourceNode, parentNode);
      }

      // Handle interface implementations
      if (classInfo.implements) {
        classInfo.implements.forEach((interfaceName) => {
          if (this.nodeMap[interfaceName]) {
            const interfaceNode = this.nodeMap[interfaceName];
            this.renderInterfaceConnection(sourceNode, interfaceNode);
          }
        });
      }

      // Handle composition using constructor parameters
      if (classInfo.constructorInfo) {
        classInfo.constructorInfo.parameters.forEach((param) => {
          const paramType = this.toPascalCase(param);
          if (this.nodeMap[paramType]) {
            const compositionNode = this.nodeMap[paramType];
            this.renderCompositionConnection(sourceNode, compositionNode);
          } else {
            console.warn(`No matching class found for parameter: ${paramType}`);
          }
        });
      }

      // Handle dependencies: check if methods use or return other classes
      if (classInfo.functions) {
        classInfo.functions.forEach((func) => {
          // Check for parameter dependencies
          func.parameters.forEach((param) => {
            const paramType = this.toPascalCase(param.type);
            if (this.nodeMap[paramType] && paramType !== className) {
              const paramNode = this.nodeMap[paramType];

              // Create a unique key for the dependency pair
              const dependencyKey = `${className}->${paramType}`;

              // Only render if the dependency hasn't been rendered yet
              if (!this.renderedDependencies.has(dependencyKey)) {
                this.renderDependencyConnection(sourceNode, paramNode);
                this.renderedDependencies.add(dependencyKey); // Mark as rendered
              }
            }
          });

          // Check for return type dependencies
          const returnType = this.toPascalCase(func.returnType);
          if (this.nodeMap[returnType] && returnType !== className) {
            const returnNode = this.nodeMap[returnType];

            // Create a unique key for the dependency pair
            const dependencyKey = `${className}->${returnType}`;

            // Only render if the dependency hasn't been rendered yet
            if (!this.renderedDependencies.has(dependencyKey)) {
              this.renderDependencyConnection(sourceNode, returnNode);
              this.renderedDependencies.add(dependencyKey); // Mark as rendered
            }
          }
        });
      }
    });

    // Render the graph to a PNG image
    this.graph.render(
      "png",
      `${this.scriptDirectory}/../diagram.png`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          return;
        }
        console.log("Class diagram PNG image generated: diagram.png");
      }
    );
  }
}
