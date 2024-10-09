import { Injectable } from '@angular/core';
import { corepermissionResultState } from '../models/core.permissionResultState'

@Injectable({
  providedIn: 'root'
})
export class CorePermissionsService {

  constructor() { }

  async validatePermission(permission: PermissionName): Promise<corepermissionResultState> {
    try {
      // retornar el estado crear un objeto para esto
      let respuesta = { response: false, status: '' } as corepermissionResultState;

      const result = await navigator.permissions.query({ name: permission });
      respuesta.status = result.state;

      if (result.state === 'granted') {
        respuesta.response = true;
      }
      return respuesta;

    } catch (error) {
      console.error('Error al solicitar permiso', error);
    }

  }

}
