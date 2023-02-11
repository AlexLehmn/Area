import React from "react";
import './AddBox.css'

// let AddBox = React.createClass({
//     createImage: function (image) {
//         return (
//             <div className="box"></div>
//         );
//     },

//     createImages: function (images) {
//         return images.map(this.createImage);
//     },

//     render: function () {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-12 text-center">

//                         {this.createImages("coucou")}

//                     </div>
//                 </div>
//             </div>
//         );
//     }
// });

function AddBox() {
    return (
        <div className="TitleArea">
            <h1>ADD BOX PLSSSS</h1>
            <p>HELPPP MMEEEE !!!</p>
        </div>
    )
}

export default AddBox;
// class AddBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { count: 0 }
//         this.handleAddingDivs = this.handleAddingDivs.bind(this)
//     }


//     handleAddingDivs() {
//         this.setState({ count: this.state.count + 1 })
//     }

//     renderDivs() {
//         let count = this.state.count, uiItems = [];
//         while (count--)
//             uiItems.push(
//                 <div className="box">
//                     This is added div! uniqueID: {count}
//                 </div>
//             )
//         return uiItems;
//     }

//     render() {
//         return (
//             <div>
//                 <h1>These are added divs </h1>
//                 <button className="btn-anchor-style add-row-link" type="button" onClick={this.handleAddingDivs}>{'Add Row'}</button>
//                 {this.renderDivs()}
//             </div>
//         )
//     }
// }

// export default AddBox;