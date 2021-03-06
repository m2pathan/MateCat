let OutsourceConstants = require('../../constants/OutsourceConstants');
let GMTSelect = require('./GMTSelect').default;
class AssignToTranslator extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            timezone: $.cookie( "matecat_timezone")
        };
    }

    shareJob() {
        //Check email and validations errors

        let date = $(this.dateInput).calendar('get date');
        let time = $(this.dropdownTime).dropdown('get value');
        date.setHours(time[0]);
        date.setMinutes(date.getMinutes() + (2 - parseFloat(this.state.timezone)) * 60);
        let timestamp = (new Date(date)).getTime();

        let email = this.email.value;

        OutsourceActions.sendJobToTranslator(email, date, this.state.timezone, this.props.job.toJS(), this.props.project.toJS());
        this.props.closeOutsource();
    }

    GmtSelectChanged(value) {
        $.cookie( "matecat_timezone" , value);
        this.setState({
            timezone: value
        });
    }

    checkSendToTranslatorButton() {
        if (this.email.value.length > 0 && APP.checkEmail(this.email.value)) {
            $(this.sendButton).removeClass('disabled');
            return true;
        } else {
            $(this.sendButton).addClass('disabled');
        }
    }

    componentDidMount () {
        let today = new Date();
        $(this.dateInput).calendar({
            type: 'date',
            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            className: {
                calendar: 'calendar-outsource'
            }
        });
        $(this.dropdownTime).dropdown();
    }

    componentWillUnmount() {}

    componentDidUpdate() {}

    render() {
        let date = '';
        let translatorEmail = '';
        let delivery = '';
        if (this.props.job.get('translator')) {
            let delivery =  APP.fromDateToString(this.props.job.get('translator').get('delivery_timestamp') * 1000);
            date =  delivery.day + ' ' + delivery.month + ' ' + delivery.year + ' at ' + delivery.time;
            translatorEmail = this.props.job.get('translator').get('email');
        }
        return <div className="assign-job-translator sixteen wide column">
                    <div className="title">
                        Assign Job to translator
                    </div>
                    <div className="title-url">
                        <div className="translator-assignee">
                            <div className="ui form">
                                <div className="fields">
                                    <div className="field translator-email">
                                        <label>Translator email</label>
                                        <input type="email" placeholder="translator@email.com" defaultValue={translatorEmail}
                                               ref={(email) => this.email = email}
                                                onKeyUp={this.checkSendToTranslatorButton.bind(this)}/>
                                    </div>
                                    <div className="field translator-delivery ">
                                        <label>Delivery date</label>
                                        <div className="ui calendar" ref={(date) => this.dateInput = date}>
                                            <div className="ui input">
                                                <input type="text" placeholder="Date" defaultValue={new Date()}
                                                       onChange={this.checkSendToTranslatorButton.bind(this)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field translator-time">
                                        <label>Time</label>
                                        <select className="ui dropdown"
                                        ref={(dropdown)=> this.dropdownTime = dropdown}>
                                            <option value="1">1:00 AM</option>
                                            <option value="2">2:00 AM</option>
                                            <option value="3">3:00 AM</option>
                                            <option value="4">4:00 AM</option>
                                            <option value="5">5:00 AM</option>
                                            <option value="6">6:00 AM</option>
                                            <option value="7">7:00 AM</option>
                                            <option value="8">7:00 AM</option>
                                            <option value="9">9:00 AM</option>
                                            <option value="10">10:00 AM</option>
                                            <option value="11">11:00 AM</option>
                                            <option value="12">12:00 AM</option>
                                            <option value="13">1:00 PM</option>
                                            <option value="14">2:00 PM</option>
                                            <option value="15">3:00 PM</option>
                                            <option value="16">4:00 PM</option>
                                            <option value="17">5:00 PM</option>
                                            <option value="18">6:00 PM</option>
                                            <option value="19">7:00 PM</option>
                                            <option value="20">8:00 PM</option>
                                            <option value="21">9:00 PM</option>
                                            <option value="22">10:00 PM</option>
                                            <option value="23">11:00 PM</option>
                                            <option value="24">12:00 PM</option>
                                        </select>
                                    </div>
                                    <div className="field gmt">
                                        <GMTSelect changeValue={this.GmtSelectChanged.bind(this)}/>
                                    </div>
                                    <div className="field send-job-box">
                                        <button className="send-job ui primary button disabled"
                                        onClick={this.shareJob.bind(this)}
                                        ref={(send) => this.sendButton=send }>Send Job to Translator</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>;
    }
}

export default AssignToTranslator ;