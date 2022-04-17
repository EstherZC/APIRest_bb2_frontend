import {Component } from 'react';

class DateHelper extends Component{

    static short_Date_Format(date){
        var shortDate= date.split('T')[0];
        var elements = shortDate.split('-');
        return elements[2]+"/"+elements[1]+"/"+elements[0]
    }
}
export default DateHelper;