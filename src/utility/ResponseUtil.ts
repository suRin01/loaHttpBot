import { RestResponse } from "./model/ResponseModel";



export class ResponseBuilder<T>{
    _isError: boolean = false;
    _erroMessage: string = undefined;
    _body: T = undefined;


    public setBody(body: T){
        this._body = body;

        return this;
    }

    public setErrorMessage(errorMessgae: string){
        this._erroMessage = errorMessgae;
        this._isError = true;
    }

    public build():RestResponse<T>{
        if(this._body === undefined && this._isError === false){
            throw new Error("If request processed successfully, body need to be filled.")
        }
        else if(this._body !== undefined && this._isError === true){
            throw new Error("If request processed unsuccessfully, body need to be empty.")
        }
        return {
            body: this._body,
            errorMessgae: this._erroMessage,
            isError: this._isError
        }
    }




}