import React from 'react';
import {Form} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

class Calc extends React.Component {
    state = {
        contrat: 80,
        couleur: "Coeur",
        ptsReelsAttaque: 0,
        ptsReelsDefense: 0,
        ptsMarquesAttaque: 0,
        ptsMarquesDefense: 0,
        ptsFaitsDefense: 0,
        ptsFaitsAttaque: 0,
        beloteDefense: false,
        beloteAttaque: false,
    };

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.updatePts(
            name === "contrat" ? value : this.state.contrat,
            name === "ptsFaitsAttaque",
            name === "ptsFaitsAttaque" || name === "ptsFaitsDefense" ? event.target.value : this.state.ptsFaitsDefense,
            name === "couleur" ? value : this.state.couleur,
            name === "beloteAttaque" ? value : name === "beloteDefense" ? !event.target.value : this.state.beloteAttaque,
            name === "beloteDefense" ? value : name === "beloteAttaque" ? !event.target.value : this.state.beloteDefense);
    };
    updatePts = (contrat, attaque, pts, couleur, beloteAttaque, beloteDefense) => {
        if(pts === 0){
            this.setState({
                couleur: couleur,
                contrat: contrat
            });
            return;
        }
        let total = 162;
        let coeff = 1;
        if(couleur === "Tout-Atout"){
            total = 258;
            coeff = 0.6279;
        }
        if(pts < 0 || pts > total){
            this.setState({
                erreur: `Les points saisis doivent être compris entre 0 et ${total}`
            });
            return;
        }
        let ptsFaitsDefense;
        let ptsFaitsAttaque;
        if(attaque) {
            ptsFaitsAttaque = pts ;
            ptsFaitsDefense = total - pts;
        } else {
            ptsFaitsDefense = pts;
            ptsFaitsAttaque = total - pts;
        }
        let ptsReelsAttaque = Math.round(ptsFaitsAttaque * coeff) + beloteAttaque && couleur !== "Sans-Atout" && couleur !== "Tout-Atout" ? 20 : 0;
        let ptsReelsDefense = Math.round(ptsFaitsDefense * coeff) + beloteDefense && couleur !== "Sans-Atout" && couleur !== "Tout-Atout" ? 20 : 0;
        let ptsMarquesAttaque = parseInt(this.state.contrat) + ptsReelsAttaque;
        let ptsMarquesDefense = ptsReelsDefense;
        let ptsChutes = 0;
        let ptsFaits = ptsReelsAttaque - this.state.contrat;
        if(ptsReelsAttaque < this.state.contrat){
            ptsMarquesAttaque = 0;
            ptsMarquesDefense = parseInt(this.state.contrat) + 160;
            ptsChutes = this.state.contrat - ptsReelsAttaque;
            ptsFaits = 0;
        }
        this.setState({
            ptsFaitsAttaque: ptsFaitsAttaque,
            ptsFaitsDefense: ptsFaitsDefense,
            ptsReelsAttaque : Math.round(ptsFaitsAttaque * coeff),
            ptsReelsDefense : Math.round(ptsFaitsDefense * coeff),
            ptsMarquesAttaque : ptsMarquesAttaque,
            ptsMarquesDefense : ptsMarquesDefense,
            ptsChutes : ptsChutes,
            ptsFaits : ptsFaits,
            beloteDefense : beloteDefense,
            beloteAttaque : beloteAttaque,
            couleur : couleur,
            contrat : contrat,
            erreur: null,
        });
    };
    render(){
        return <div>
            <h1>Calculette</h1>
            <Form>
                <Form.Group controlId="contrat">
                    <div className="row">
                        <div className="col">
                            <Form.Label>Contrat</Form.Label>
                            <Form.Control as="select" name="contrat" value={this.state.contrat} onChange={this.handleInputChange}>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                                <option>110</option>
                                <option>120</option>
                                <option>130</option>
                                <option>140</option>
                                <option>150</option>
                                <option>160</option>
                            </Form.Control>
                        </div>
                        <div className="col">
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control as="select" name="couleur" value={this.state.couleur} onChange={this.handleInputChange}>
                                <option>Coeur</option>
                                <option>Pique</option>
                                <option>Carreau</option>
                                <option>Trèfle</option>
                                <option>Sans-Atout</option>
                                <option>Tout-Atout</option>
                            </Form.Control>
                        </div>
                    </div>

                </Form.Group>
                <div className="row">
                    <div className="col">
                        <h3>Attaque</h3>
                        <Form.Group controlId="ptsFaits">
                            <Form.Label>Points faits</Form.Label>
                                <Form.Control type="text" name="ptsFaitsAttaque" placeholder="Points faits" value={this.state.ptsFaitsAttaque} onChange={this.handleInputChange}/>
                                <Form.Check type="checkbox" name="beloteAttaque" label="Belote" checked={this.state.beloteAttaque} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="ptsReels">
                            <Form.Label>Points réels</Form.Label>
                            <Form.Control type="number" placeholder="Points réels" readOnly value={this.state.ptsReelsAttaque}/>
                        </Form.Group>
                        <Form.Group controlId="ptsMarques">
                            <Form.Label>Points marqués</Form.Label>
                            <Form.Control type="number" placeholder="Points marqués" readOnly value={this.state.ptsMarquesAttaque}/>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <h3>Défense</h3>
                        <Form.Group controlId="ptsFaits">
                            <Form.Label>Points faits</Form.Label>
                            <Form.Control type="text" name="ptsFaitsDefense" placeholder="Points faits" checked={this.state.ptsFaitsDefense} onChange={this.handleInputChange}/>
                            <Form.Check type="checkbox" name="beloteDefense" value={this.state.beloteDefense} onChange={this.handleInputChange} label="Belote" />
                        </Form.Group>
                        <Form.Group controlId="ptsReels">
                            <Form.Label>Points réels</Form.Label>
                            <Form.Control type="number" placeholder="Points réels" readOnly value={this.state.ptsReelsDefense}/>
                        </Form.Group>
                        <Form.Group controlId="ptsMarques">
                            <Form.Label>Points marqués</Form.Label>
                            <Form.Control type="number" placeholder="Points marqués" readOnly value={this.state.ptsMarquesDefense} />
                        </Form.Group>
                    </div>

                </div>
                {this.state.erreur && <div className="row"><div className="col"><Alert variant="danger">
                    {this.state.erreur}
                </Alert></div></div>}

            </Form>
            {this.state.ptsChutes || this.state.ptsFaits ? this.state.ptsChutes > 0 ?
                <Alert variant="danger">
                    Contrat chûté de {this.state.ptsChutes} points :( !
                </Alert> :
                <Alert variant="success">
                    Contrat fait de {this.state.ptsFaits} points :) !
                </Alert>
                :
                <p></p>
            }
        </div>

    };
}
export default Calc;