import { Directive, EventEmitter, ElementRef ,
          HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  // Para recibir un objeto desde el componente
  @Input() archivos: FileItem[] = [];

  // Para comunicarse con el elemento que lo contiene. Entre <> el tipo de elemento que se quiere emitir
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  /**
   * Para especificar un callback cuando suceda dragover (arrastrar algo sobre el elemento que contiene la directiva)
   * @param event Recibe el evento que se dispara
   */
  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
    // Emite un boolean
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    // Emite un boolean
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {

    const transferencia = this._getTransferencia( event );

    if ( !transferencia ) {
      return;
    }

    this._extraerArchivos( transferencia.files );

    this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ) {

    console.log(archivosLista);

    // Para "barrer" cada una de las propiedades del objeto
    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames( archivosLista )) {

      const archivoTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado( archivoTemporal ) ) {
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }

    console.log(this.archivos);

  }

  // Validaciones
  private _archivoPuedeSerCargado( archivo: File ): boolean {

    if (!this._archivoYaArrastrado(archivo.name) && this._esImagen(archivo.type)) {
        return true;
    } else {
      return false;
    }

  }

  private _prevenirDetener( event: Event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaArrastrado( nombreArchivo: string ): boolean {

    for (const archivo of this.archivos) {

      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log(`El archivo ${nombreArchivo} ya está agregado` );
        return true;
      }

    }

    return false;

  }

  private _esImagen( tipoArchivo: string): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
