import React,{Component} from 'react'
import classes from'./ShippingCalculator.module.css';
import classNames from 'classnames'
import Select from 'react-select'
import axios from 'axios'


const Loader = () => (
    <div className={classes.divLoader}>
      <svg className={classes.svgLoader} viewBox="0 0 100 100" width="10em" height="10em ">
        <path  stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" 
        transform="rotate(179.719 50 51)">
            <animateTransform 
            attributeName="transform" type="rotate" calcMode="linear" 
            values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
                </animateTransform></path>
      </svg>
    </div>
  );

class ShippingCalculator extends Component{

  
    
    state = { pickupPostcode: '',
     deliveryPostcode: '', 
     vehicleType: '', 
     price: '', 
     error:false, 
     loading:false
    };
    
    

    _onChange(value) {
        //console.log(value) - just to see what we recive from <Select />
        // console.log(value.value);
        this.setState({vehicleType: value.value, vehicleName:value.label}
            
            );
        console.log(this.state)
      }
    
      handleChange =(event) =>  {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    

      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const reqoptions = {
            pickupPostcode: this.state.pickupPostcode,
            deliveryPostcode: this.state.deliveryPostcode,
            vehicleType: this.state.vehicleType
        };
        // showLoader();
        this.setState({loading:true})
        console.log(reqoptions);
        axios.post('http://localhost:8080/quote', reqoptions)
          .then((result) => {
            console.log('weqeqeeqw');
            // hideLoader();
            console.log(this.setState({price: result.data.price}));
            console.log(this.state);
            this.setState({loading:false})
          })
          .catch(error =>{
            this.setState({error:true});
            this.setState({loading:false})
          }
          
          );

           this.duplicate = {...this.state} 
      }

      

//       async  componentDidMount() {
//         
//         console.log(this.state);
//         const response = await axios.post('http://localhost:8080/quote', reqoptions1);
//         console.log(response);
//         // .then(response => 
//         // {
//         //     console.log('cccc');    
//         //     console.log(response);
//         // })
//    
//     }



    render(){

        const customStyles = {
            control: (base, state) => ({
            ...base,
            // background: "#023950",
            backgroundColor: "#ebebeb",
            color: "black",
            margin: "30px auto",
            width: "320px",
            borderColor:"green",
            })
        };
        console.log(this, "render")
        const options =[
            {label: "Bicyle", value: "bicycle"},
            {label: "Motorbike", value: "motorbike"},
            {label: "Parcel Van", value: "parcel_car"},
            {label: "Small Van", value: "small_van"},
            {label: "Large Van", value: "large_van"}
        ];

        
       
       
        return(
            <>
            
              <div>
                  
                {this.state.error ? <p>Somthing went Wrong.. Refresh the page! </p> :  <form className={classNames(classes.form)} onSubmit={this.onSubmit}>
                    <div className={classNames(classes.title, classes.pageTitle)} >Shipping Calculator</div>
                    
                    <input 
                        type="text" className= {classNames(classes.name,classes.formEntry)}
                        value={this.state.pickupPostcode} 
                        onChange={this.handleChange}
                        name="pickupPostcode"
                        placeholder="Pickup Postcode" />

                     

                    <input 
                        type="text" className= {classNames(classes.name,classes.formEntry)}
                        value={this.state.deliveryPostcode}
                        onChange={this.handleChange}
                        name="deliveryPostcode"
                        placeholder="Delivery Postcode" 
                     />
          
                    <div   >
                        <Select 
                            styles={customStyles}
                            name="vehicle"
                            options={options}
                            placeholder="Vehicle Type"
                            value={this.state.vehicle}
                            // onChange={this.handleChange}
                            searchable={false}
                            onChange={this._onChange.bind(this)}
                            />
                    </div>
                     <button 
                        className={classNames(classes.submit, classes.formEntry)}
                        value="Send"
                        type="submit"
                     >Calculate Estimation</button>
                    
                    

                    {this.state.loading ? <Loader /> : <div>     
                                       { this.state.price ? <p className={classNames(classes.shippingTitle)}>
                        
                    A delivery from <b>{this.duplicate.pickupPostcode}</b> to  <b>{this.duplicate.deliveryPostcode} </b> using a <b>{this.duplicate.vehicleName}</b> will cost you <b>£{this.state.price}</b></p>:null}

                    </div>}

                </form>} 
               
            </div>
          
            
            </>
        );
    }
};

export default ShippingCalculator;