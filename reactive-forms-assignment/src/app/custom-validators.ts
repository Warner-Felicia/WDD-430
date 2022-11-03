import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
    static forbiddenProject(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test' || control.value === 'test') {
            return { 'projectNameIsForbidden': true }
        } else {
            return null;
        }
    }

    static asyncForbiddenProjectAsync(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test Project' || control.value === 'test project') {
                    resolve({ 'projectNameIsForbidden': true })
                } else {
                    resolve(null);
                }
            }, 2000);
        });
        return promise;
    }
}