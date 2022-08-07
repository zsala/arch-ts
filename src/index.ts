import { readProjectFiles } from "./readProjectFiles";
import GraphRenderer from "./graph.renderer";
import { ArchAnalyzer } from "./arch.analyzer";

const projectFiles = readProjectFiles("./dist-code/simple-example");
const archAnalyzer = new ArchAnalyzer(projectFiles);
const graphRenderer = new GraphRenderer();

let classInfoMap = {};

classInfoMap = archAnalyzer.analyze();
graphRenderer.render(classInfoMap);

console.log(classInfoMap);