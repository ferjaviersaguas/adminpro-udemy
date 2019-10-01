import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string): any {
    let url = URL_SERVICIOS + "/img";

    if (!img) {
      return url + "/usuarios/xxx";
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case "usuario":
        url += "/usuarios/" + img;
        break;

      case "medico":
        url += "/medicos/" + img;
        break;

      case "hospital":
        url += "/hospitales/" + img;
        break;
        // http://localhost:3000/upload/hospitales/5d5d3a766c00703ab0b43000
      default:
        // console.log('Tipo de imagen no existe. Disponible: usuario, medico, hospital');
        url += "/usuarios/xxx";
    }

    return url;
  }
}
