export function LogMethod(
    target: {},
    propertyName: string,
    propertyDescriptor: PropertyDescriptor): PropertyDescriptor {

    const method = propertyDescriptor.value;

    propertyDescriptor.value = function(...args: any[]): string {

        // convert list of greet arguments to string
        const params = args.length > 2 ? args.join(', ') : args.join();

        // invoke the function and get its return value
        const result = method.apply(this, args);

        // display in console the function call details
        console.log(`Call: ${propertyName}(${params}) => ${result ? result : 'void'}`);

        // return the result of invoking the method
        return result;
    };
    return propertyDescriptor;
}
