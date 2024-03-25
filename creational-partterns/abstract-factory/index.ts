interface AbstractProductA {
  useFulFunctionA(): string
}

interface AbstractProductB {
  useFulFunctionB(): string
  anotherUseFulFunctionB(collaborator: AbstractProductA): string
}

interface AbstractFactory {
  createProductA(): AbstractProductA
  createProductB(): AbstractProductB
}

class ConcreteProductA1 implements AbstractProductA {
  public useFulFunctionA(): string {
    return 'The result of the product A1.'
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public useFulFunctionA(): string {
    return 'The result of the product A2.'
  }
}

class ConcreteProductB1 implements AbstractProductB {
  public useFulFunctionB(): string {
    return 'The result of the product B1.'
  }

  public anotherUseFulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.useFulFunctionA()
    return `The result of the B1 collaborating with the (${result})`
  }
}

class ConcreteProductB2 implements AbstractProductB {
  useFulFunctionB(): string {
    return 'The result of the product B2.'
  }

  anotherUseFulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.useFulFunctionA()
    return `The result of the B2 collaborating with the (${result})`
  }
}

class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1()
  }
  public createProductB(): AbstractProductB {
    return new ConcreteProductB1()
  }
}
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2()
  }
  createProductB(): AbstractProductB {
    return new ConcreteProductB2()
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA()
  const productB = factory.createProductB()

  console.log(productB.useFulFunctionB())
  console.log(productB.anotherUseFulFunctionB(productA))
}

console.log('Client: Testing client code with the first factory type...')
clientCode(new ConcreteFactory1())

console.log('')

console.log('Client: Testing the same client code with the second type...')
clientCode(new ConcreteFactory2())
