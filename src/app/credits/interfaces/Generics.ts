export interface Generics<model> {
    open_filter(): void;
    open_modal_edit(model: model): void;
    delete_record(model: model): void;
    open_modal(): void;
    send(): void;
  }