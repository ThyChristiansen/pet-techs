import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pet from '../Pet/Pet';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";

import { withRouter } from 'react-router-dom';
import '../ClientProfile/ClientProfile.css';


const styles = theme => ({
    root: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: '70px',
        flexGrow: 1,
    },
    paddingTop: {
        paddingTop: 50,
    },
    title: {
        backgroundColor: '#faefec',
        paddingTop: 85,
        width: '100%',
    },
    name: {
        textAlign: 'center',
    },

    items: {
        padding: theme.spacing(2),
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        borderRadius: '50%',
        position: 'absolute',
        top: 170,
        left: 100,
    },
    clientInfo: {
        marginBottom: 0,
        position: 'absolute',
        top: 160,
        left: 330,
    },
    client_content: {
        marginTop: 200,

    },
    editButton: {
        display: 'flex',
        justifyContent: "right",
        marginLeft: '85%',
    }
});



class ClientProfileDetail extends Component {


    state = {
        editable: false,

        id: '',
        client_name: '',
        profile_img: '',
        about_client: '',
        about_home: '',
        city: '',
        state: ''
    }


    componentDidMount() {
        const currentClient = this.props.clientInfo.find(client => client.id === parseInt(this.props.match.params.id))
        console.log("-------------->client profile", currentClient);
        this.setState({
            id: currentClient.id,
            client_name: currentClient.client_name,
            profile_img: currentClient.profile_img,
            about_client: currentClient.about_client,
            about_home: currentClient.about_home,
            city: currentClient.city,
            state: currentClient.state,
        })
        console.log('state:', this.state)

        const currentId = this.props.match.params.id;

        this.props.dispatch({
            type: 'GET_PET_DATA',
            payload: { id: currentId }
        })
        console.log('pet data:', this.props.petInfo)

    }




    handleBackButton = () => {
        console.log('clicked');
        this.props.history.push('/clientdashboard');
    }
    handleEditClient = () => {
        console.log('edit clicked!');
        this.setState({
            editable: true,
        });
    }
    handleSaveClient = () => {
        console.log('Save clicked!')
        this.setState({
            editable: !this.state.editable,
        });
    }
    handleInputChangeFor = property => (event) => {
        console.log('input change', property, event.target.value)
        this.setState({
            [property]: event.target.value,
        });
    }

    render() {


        const { classes } = this.props;
        return (
            <div className={classes.root} >
                {/* <h1>{JSON.stringify(this.props.clientInfo)}</h1> */}
                {/* {this.props.clientInfo.map((client) => {
                    return (<h1>{client.client_name} </h1>)
                })} */}
                <div className={classes.title}>
                    <div className={classes.userBasicInfo}>
                        <Grid container spacing={1}>
                            <Grid item xs={5} className={classes.items}>
                                <img className={classes.img} src="images/blank-profile-picture.png" alt="profile" height="150" width="150" />
                            </Grid>

                            <Grid item xs={3} className={classes.clientInfo}>
                                {this.state.editable ?
                                    <>
                                        <p><input value={this.state.client_name} onChange={this.handleInputChangeFor("client_name")} /></p>
                                    </>
                                    :
                                    <>
                                        <h3>{this.state.client_name}</h3>
                                    </>
                                }
                                {/* <p>{this.state.city}, {this.state.state}</p> */}
                                {this.state.editable ?
                                    <>
                                        <p><input value={this.state.city} onChange={this.handleInputChangeFor("city")} /></p>
                                        <p><input value={this.state.state} onChange={this.handleInputChangeFor("state")} /></p>

                                    </>
                                    :
                                    <>
                                        <p>{this.state.city}, {this.state.state}</p>
                                    </>
                                }

                                <Button variant="contained" color="primary" > <a href={`mailto:${this.props.user.user_email}`} target="_blank" className='link'> Contact to {this.state.client_name}</a></Button>
                                {/* <Button variant="contained" color="primary" className='link ><a href={`mailto:${this.props.clientInfo.user_email}`}>Contact to {{this.state.client_name}</a></Button> */}
                            </Grid>
                            <Grid item xs={3} className={classes.editButton}>
                                {this.state.editable ?
                                    <>
                                        <img src="images/checkmark.png" alt="save_button" height="50" width="50" onClick={this.handleSaveClient} />
                                        <p>Save</p>
                                    </>
                                    :
                                    <>
                                        <img src="images/edit.png" alt="edit_button" height="50" width="50" onClick={this.handleEditClient} />
                                        <p>Edit profile</p>
                                    </>
                                }
                                {/* <img src="images/edit.png" alt="edit_button" height="50" width="50" onClick={this.handleEditClient} /> */}
                            </Grid>
                        </Grid>
                    </div>
                </div>
                {/* </Container> */}

                <Container className={classes.client_content} maxWidth="md">
                    <Grid container spacing={3} >
                        <Grid item xs={6} sm={3} >
                            <table className="about_table">
                                <thead >
                                    <tr>
                                        <th className="table_head">About {this.state.client_name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {this.state.editable ?
                                            <>
                                                <td><input value={this.state.about_client} onChange={this.handleInputChangeFor("about_client")} /></td>
                                            </>
                                            :
                                            <>
                                                <td>{this.state.about_client}</td>
                                            </>
                                        }
                                    </tr>
                                    {/* <tr><td>ksfdnjksdnfjknsjkfsndkjfnsdkjfnskdjnfkjsdnfjkdsnfkjsdnfkjdsnfkjdsnkfndskjfnksdnfksdnfkjsdnfjknsdkjfnsjkdnfjksdnfksjdnfjksdnfjksdfn</td></tr> */}
                                </tbody>
                            </table>
                        </Grid>


                    </Grid>

                    <Grid item xs={12} className={classes.name}>
                        <h3>{this.state.client_name}'s Pets</h3>
                    </Grid>
                    {/* <h1>{JSON.stringify(this.props.petInfo)}</h1> */}
                    <Grid container spacing={3} className={classes.items}>
                        {this.props.petInfo.map((pet) => {
                            return (
                                <div key={pet.id}>
                                    <Pet
                                        pet={pet}
                                    />
                                </div>
                            )
                        })}

                        {/* ---------Content inside pet picture array when mapping------------ */}
                        <Grid item xs={6} >
                            <img src="images/blank-profile-picture.png" alt="profile" height="50" width="50" />
                            <img src="images/blank-profile-picture.png" alt="profile" height="50" width="50" />
                            <img src="images/blank-profile-picture.png" alt="profile" height="50" width="50" />
                            <img src="images/blank-profile-picture.png" alt="profile" height="50" width="50" />
                        </Grid>

                        {/* ---------Content inside pet picture array when mapping------------ */}

                    </Grid>
                    <Grid container spacing={12} className={classes.paddingTop}>
                        <Grid item xs={6} className={classes.items}>
                            <img src="images/house-icon.png" alt="profile" height="80" width="90" />
                            <table className="about_table">
                                <thead>
                                    <tr>
                                        <th className="table_head">{this.state.client_name}'s Pet Equipment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* I have a kennel for both animals, as well as extra medical equipment for my preecious... */}
                                        <td>{this.state.care_equipment}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item xs={6} className={classes.items}>
                            <img src="images/house-icon.png" alt="profile" height="80" width="90" />
                            <table className="about_table">
                                <thead >
                                    <tr>
                                        <th className="table_head">{this.state.client_name}'s Home Enviroment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <td>{this.state.about_home}</td> */}
                                        {this.state.editable ?
                                            <>
                                                <td><input value={this.state.about_home} onChange={this.handleInputChangeFor("about_home")} /></td>
                                            </>
                                            :
                                            <>
                                                <td>{this.state.about_home}</td>
                                            </>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.items}>
                        <Button variant="contained" color="primary" onClick={this.handleBackButton}>Back to Dashboard</Button>
                    </Grid>
                </Container>

            </div>
        )
    }

}
const mapStateToProps = (reduxState) => ({
    clientInfo: reduxState.clientInfo,
    petInfo: reduxState.petInfo,
    user: reduxState.user,
})


export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ClientProfileDetail)));

