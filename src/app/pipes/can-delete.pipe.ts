import { Pipe, PipeTransform } from '@angular/core';
import { TodoPermissions } from '../types/common.types';

@Pipe({
    name: 'canDelete',
    standalone: true,
})
export class CanDeletePipe implements PipeTransform {
    transform(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.delete);
    }
}
