namespace _util {

	export const DI_TARGET = '$di$target';
	export const DI_DEPENDENCIES = '$di$dependencies';

	export function getServiceDependencies(ctor: any): { id: ServiceIdentifier<any>, index: number, optional: boolean }[] {
		return ctor[DI_DEPENDENCIES] || [];
	}
}
function storeServiceDependency(id: Function, target: Function, index: number, optional: boolean): void {
	if (target[_util.DI_TARGET] === target) {
		target[_util.DI_DEPENDENCIES].push({ id, index, optional });
	} else {
		target[_util.DI_DEPENDENCIES] = [{ id, index, optional }];
		target[_util.DI_TARGET] = target;
	}
}

/**
 * A *only* valid way to create a {{ServiceIdentifier}}.
 */
function createDecorator<T>(serviceId: string): { (...args: any[]): void; type: T; } {

	let id = function (target: Function, key: string, index: number): any {
		if (arguments.length !== 3) {
			throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
		}
		storeServiceDependency(id, target, index, false);
	};

	id.toString = () => serviceId;

	return <any>id;
}
interface ServiceIdentifier<T> {
	(...args: any[]): void;
	type: T;
}