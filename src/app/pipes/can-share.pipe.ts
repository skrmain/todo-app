import { Pipe, PipeTransform } from '@angular/core';
import { TodoPermissions } from '../types/common.types';

@Pipe({
    name: 'canShare',
})
export class CanSharePipe implements PipeTransform {
    transform(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.share);
    }
}
