import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// material UI imports
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";

const useStyles = (theme) => ({
  root: {
    marginTop: 100,
    marginBottom: 40,
    textAlign: "center",
  },
  cardSearch: {
    width: 300,
    height: 200,
  },
  profileCenter: {
    textAlign: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  profileImage: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  container: {
    marginTop: 50,
  },
  itemCenter: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  paper: {
    border: "2px solid #195C60",
  },
  table: {
    width: "100%",
    backgroundColor: "#FFC2B4",
    boderRadius: "10px",
    backgroundColor: "rgb(250, 250, 250)",
  },
  items: {
    border: "2px solid #195C60",
    boderRadius: "10px",
    paddingTop: 15,
    paddingBottom: 15,
    margin: 8,
    textAlign: "center",
  },
  tableBody: {
    height: 300,
    padding: 20,
    borderTop: "2px solid #195C60",
  },
});

class CarePlanDetail extends Component {
  state = {
    carplan: this.props.careplan,
    isEditing: this.props.isEditing,
    pet_bio: this.props.careplan.pet_bio,
    feeding_per_day: this.props.careplan.feeding_per_day,
    food_brand: this.props.careplan.food_brand,
    amount_per_meal: this.props.careplan.amount_per_meal,
    pet_behavior: this.props.careplan.pet_behavior,
    care_equipment: this.props.careplan.care_equipment,
    sex: this.props.careplan.sex,
    breed: this.props.careplan.breed,
    weight: this.props.careplan.weight,
    age: this.props.careplan.age,
    medication_name: this.props.careplan.medication_name,
    general: true,
    feeding: false,
    medical: false,
    behavioral: false,
    equipment: false,
    other: false,
  };

  handleInputChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    });
  };
  componentDidMount() {
    const currentId = this.props.match.params.id;
    this.props.dispatch({
      type: "GET_CLIENT_DATA",
      payload: { id: currentId },
    });
  }

  backToProfile = () => {
    this.props.history.goBack();
  };
  // edit care plan
  handleEditToggle = () => {
    this.props.dispatch({
      type: "SAVE_PET_DETAILS",
      payload: {
        id: this.props.match.params.id,
        ...this.state,
      },
    });
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };
  // edit toggle
  handleEditButton = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  handleGeneralOpen = () => {
    this.setState({
      general: true,
      feeding: false,
      medical: false,
      behavioral: false,
      equipment: false,
      other: false,
    });
  };
  handleFeedingOpen = () => {
    this.setState({
      feeding: true,
      general: false,
      medical: false,
      behavioral: false,
      equipment: false,
      other: false,
    });
  };
  handleMedicalOpen = () => {
    this.setState({
      general: false,
      feeding: false,
      medical: true,
      behavioral: false,
      equipment: false,
      other: false,
    });
  };
  handleBehavioralOpen = () => {
    this.setState({
      general: false,
      feeding: false,
      medical: false,
      behavioral: true,
      equipment: false,
      other: false,
    });
  };
  handleEquipmentOpen = () => {
    this.setState({
      general: false,
      feeding: false,
      medical: false,
      behavioral: false,
      equipment: true,
      other: false,
    });
  };

  handleOtherOpen = () => {
    this.setState({
      general: false,
      feeding: false,
      medical: false,
      behavioral: false,
      equipment: false,
      other: true,
    });
  };

  render() {
    const { classes } = this.props;
    let contentBody;
    if (this.state.general) {
      contentBody = (
        <>
          <Typography>
            I am a{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Gender"
                size="small"
                value={this.state.sex}
                onChange={this.handleInputChange("sex")}
              />
            ) : (
              this.state.sex
            )}{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Breed"
                size="small"
                value={this.state.breed}
                onChange={this.handleInputChange("breed")}
              />
            ) : (
              this.state.breed
            )}
            . I weight{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Weight"
                size="small"
                value={this.state.weight}
                onChange={this.handleInputChange("weight")}
              />
            ) : (
              this.state.weight
            )}{" "}
            pounds and I am{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Age"
                size="small"
                value={this.state.age}
                onChange={this.handleInputChange("age")}
              />
            ) : (
              this.state.age
            )}{" "}
            years old.{" "}
          </Typography>
          <Typography>
            Bio:{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Pet info"
                size="small"
                value={this.state.pet_bio}
                onChange={this.handleInputChange("pet_bio")}
              />
            ) : (
              this.state.pet_bio
            )}
          </Typography>
        </>
      );
    } else if (this.state.feeding) {
      contentBody = (
        <>
          {" "}
          <Typography>
            I like to eat{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Feedings Per Day"
                size="small"
                value={this.state.feeding_per_day}
                onChange={this.handleInputChange("feeding_per_day")}
              />
            ) : (
              this.state.feeding_per_day
            )}{" "}
            meals per day, and my favorite food is{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Pet Food Brand"
                size="small"
                value={this.state.food_brand}
                onChange={this.handleInputChange("food_brand")}
              />
            ) : (
              this.state.food_brand
            )}
            .
          </Typography>
          <Typography>
            Please feed me{" "}
            {this.state.isEditing ? (
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                label="Amount of food per meal"
                size="small"
                value={this.state.amount_per_meal}
                onChange={this.handleInputChange("amount_per_meal")}
              />
            ) : (
              this.state.amount_per_meal
            )}{" "}
            for each meal!
          </Typography>
        </>
      );
    } else if (this.state.medical) {
      contentBody = <Typography>{this.state.medication_name}</Typography>;
    } else if (this.state.behavioral) {
      contentBody = (
        <Typography>
          {this.state.isEditing ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="secondary"
              label="General Pet Behavior"
              multiline
              rows={5}
              fullWidth
              value={this.state.pet_behavior}
              onChange={this.handleInputChange("pet_behavior")}
            />
          ) : (
            this.state.pet_behavior
          )}
        </Typography>
      );
    } else if (this.state.equipment) {
      contentBody = (
        <Typography>
          {this.state.isEditing ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="secondary"
              label="Special Care Equipment"
              multiline
              rows={5}
              fullWidth
              value={this.state.care_equipment}
              onChange={this.handleInputChange("care_equipment")}
            />
          ) : (
            this.state.care_equipment
          )}
        </Typography>
      );
    } else if (this.state.other) {
      contentBody = (
        <>
          <Typography>Contact information:</Typography>
          <Typography>
            - Name: {this.props.clientInfo.contact_name_1}
          </Typography>
          <Typography>
            - Phone: {this.props.clientInfo.contact_phone_1}
          </Typography>
          <Typography>
            - Email: {this.props.clientInfo.contact_email_1}
          </Typography>
        </>
      );
    }

    return (
      <Container maxWidth="md">
        <img
          className={classes.profileCenter}
          src="/images/careplan_icon.png"
          alt="care_plan_icon"
          height="auto"
          width="auto"
        />
        <Typography variant="h3" className={classes.profileCenter}>
          Care plan
        </Typography>

        <TableContainer component={Paper} className={classes.paper}>
          <Table
            className={classes.table}
            aria-label="a dense table"
            size="small"
          >
            <TableBody>
              <TableRow>
                <TableCell variant="head">
                  <Avatar
                    className={classes.profileImage}
                    src={this.props.careplan.media_url}
                    alt={this.props.careplan.profile_img}
                  />
                  <Typography variant="h3" className={classes.profileCenter}>
                    {this.props.careplan.pet_name}
                  </Typography>

                  <Grid container className={classes.itemCenter}>
                    <ButtonGroup
                      color="secondary"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={this.handleGeneralOpen}>General</Button>
                      <Button onClick={this.handleFeedingOpen}>Feeding</Button>
                      <Button onClick={this.handleMedicalOpen}>Medical</Button>
                      <Button onClick={this.handleBehavioralOpen}>
                        Behavioral
                      </Button>
                      <Button onClick={this.handleEquipmentOpen}>
                        Care Equipment
                      </Button>
                      <Button onClick={this.handleOtherOpen}>Other</Button>
                    </ButtonGroup>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow variant="body">
                <Grid className={classes.tableBody}>{contentBody}</Grid>
              </TableRow>
              <TableRow variant="footer">
                {!this.props.isVetTech && (
                  <Grid className={classes.itemCenter}>
                    {this.state.isEditing ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={this.handleEditButton}
                        >
                          Cancel{" "}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleEditToggle}
                        >
                          Save{" "}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleEditButton}
                      >
                        Edit{" "}
                      </Button>
                    )}
                  </Grid>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.itemCenter}>
          <Button variant="contained" onClick={this.backToProfile}>
            Back
          </Button>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isVetTech: state.user.user_type === 1,
  clientInfo: state.clientInfo[0],
});

export default withStyles(useStyles)(
  withRouter(connect(mapStateToProps)(CarePlanDetail))
);
