import React from 'react';

import Introduction from './Introduction';

/*Home Page
*/
export default class HomePage extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="homepage viewpage">
                <Introduction/>
            </div>
            );
    }
}
