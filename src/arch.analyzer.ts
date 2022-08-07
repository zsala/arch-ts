import * as ts from "typescript";
import { ClassFunction, ClassConstructor, ClassInfo } from "./domain";
import ClassInfoMap from "./domain/classInfoMap";
import { ClassType } from "./domain/class.info";

export class ArchAnalyzer {
  private classInfoMap: ClassInfoMap = {};

  constructor(private filePaths: string[]) {}

  public analyze(): ClassInfoMap {
    for (const filePath of this.filePaths) {
      const program = ts.createProgram({ rootNames: [filePath], options: {} });
      const sourceFile = program.getSourceFile(filePath);
      const checker = program.getTypeChecker();

      if (sourceFile) {
        this.visitSourceFile(sourceFile, checker);
      }
    }
    return this.classInfoMap;
  }

  private visitSourceFile(sourceFile: ts.SourceFile, checker: ts.TypeChecker): void {
    const visit = (node: ts.Node) => {
      if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        this.extractClassOrInterface(node);
      }

      if (ts.isConstructorDeclaration(node)) {
        this.extractConstructor(node);
      }

      if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node)) {
        this.extractMethod(node, checker);
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  private extractClassOrInterface(node: ts.ClassDeclaration | ts.InterfaceDeclaration): void {
    const className = node.name?.escapedText.toString() || "UnnamedClass";
    const classInfo: ClassInfo = {
      name: className,
      type: ts.isInterfaceDeclaration(node) ? ClassType.INTERFACE : ClassType.CLASS,
    };
  
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          classInfo.extends = clause.types[0]?.expression.getText() || "Unknown";
        }
        if (clause.token === ts.SyntaxKind.ImplementsKeyword) {
          classInfo.implements = clause.types.map((type) => type.expression.getText());
        }
      }
    }
  
    if (!this.classInfoMap[className]) {
      this.classInfoMap[className] = {
        name: className,
        functions: [],
        constructorInfo: undefined,
        type: classInfo.type,
      };
    }
  
    // Update the classInfoMap with the newly created classInfo
    this.classInfoMap[className] = classInfo;
  }
  

  private extractConstructor(node: ts.ConstructorDeclaration): void {
    const className = node.parent.name?.escapedText.toString() || "UnnamedClass";
    const constructorInfo: ClassConstructor = {
      parameters: node.parameters.map((param) => (param.name as ts.Identifier).escapedText.toString()),
    };

    if (!this.classInfoMap[className]) {
      this.classInfoMap[className] = { name: className, functions: [], constructorInfo: constructorInfo, type: ClassType.CLASS };
    } else {
      this.classInfoMap[className].constructorInfo = constructorInfo;
    }
  }

  private extractMethod(node: ts.MethodDeclaration | ts.MethodSignature, checker: ts.TypeChecker): void {
    // First, ensure that the parent is either a Class or Interface declaration
    let className: string | undefined = "UnnamedClass";
    if (ts.isClassDeclaration(node.parent) || ts.isInterfaceDeclaration(node.parent)) {
      className = node.parent.name ? node.parent.name.escapedText.toString() : "UnnamedClass";
    }
  
    // Extract the method name
    const functionName = node.name ? (node.name as ts.Identifier).escapedText.toString() : "UnnamedFunction";
  
    // Prepare function info object
    const functionInfo: ClassFunction = {
      name: functionName,
      parameters: [],
      returnType: "void",
    };
  
    // Extract parameters (name and type)
    functionInfo.parameters = node.parameters.map((param) => {
      const paramName = (param.name as ts.Identifier).escapedText.toString();
      let paramType = "any";
      if (param.type) {
        const type = checker.getTypeFromTypeNode(param.type);
        paramType = checker.typeToString(type);
      }
      return { name: paramName, type: paramType };
    });
  
    // Extract return type using TypeChecker
    if (node.type) {
      const returnType = checker.getTypeFromTypeNode(node.type);
      functionInfo.returnType = checker.typeToString(returnType);
    }
  
    // Ensure the class exists in the map
    if (!this.classInfoMap[className]) {
      this.classInfoMap[className] = { name: className, functions: [], constructorInfo: undefined, type: ClassType.CLASS };
    }
  
    // Add the method to the class's function list
    if (!this.classInfoMap[className].functions) {
      this.classInfoMap[className].functions = [];
    }
    this.classInfoMap[className].functions!.push(functionInfo);
  }
}
