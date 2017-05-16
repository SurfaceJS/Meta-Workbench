import { CustomElement } from "@surface/core/custom-element";
import { component }     from "@surface/core/decorators";
import { List }          from "@surface/core/enumerable/list";
import { Row }           from "@surface/components/data/row";
import { Column }        from "@surface/components/data/column";

import template from "index.html";
import style    from "index.scss";

@component("data-grid", template, style)
export class Grid extends CustomElement
{
    private _rows:    List<Row>    = new List<Row>();
    private _headers: List<Column> = super.attachAll<Column>("data-column");
    
    private _source: Iterable<Object> = [1, 2, 3];
    public get source(): Iterable<Object>
    {
        return this._source;
    }
    
    public set source(value: Iterable<Object>)
    {
        this._source = value;
    }

    public get rows(): List<Row>
    {
        return this._rows;
    }

    public addRow(row: Row)
    {
        this._rows.add(row);
        this.appendChild(row);
    }

    public removeRow(index: number)
    {
        let row = this._rows.item(index);
        this.removeChild(row);
    }

    public constructor()
    {
        super();
    }

    public initialize(): void
    {
        let headerRow = new Row();
        this._headers.forEach
        (
            (x, i) =>
            {
                
                let column = new Column();
                column.innerText = x.header;
                headerRow.addColumn(column);

            }
        );
        this.addRow(headerRow);

        for (let item of this._source)
        {
            let row = new Row();
            this._headers.forEach
            (
                () =>
                {
                    let column = new Column();
                    column.innerText = item.toString();
                    row.addColumn(column);
                }
            );

            this.addRow(row);
        }
    }

    public connectedCallback(): void
    {
        this.initialize();
    }
}