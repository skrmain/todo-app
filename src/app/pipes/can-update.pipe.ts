import { Pipe, PipeTransform } from '@angular/core';
import { TodoPermissions } from '../types/common.types';

@Pipe({
    name: 'canUpdate',
    standalone: true,
})
export class CanUpdatePipe implements PipeTransform {
    transform(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.write);
    }
}
