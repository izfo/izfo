document.addEventListener('DOMContentLoaded', (event) => {
    const submitButton = document.getElementById("submit-button");
    const diagnosisText = document.getElementById("diagnosis-text")

    const cigaretteNumberCheckbox = document.getElementById("smoker");
    const cigaretteNumberTextbox = document.getElementById("cigarette-number");
    const medicationCheckbox = document.getElementById("medication");
    const medicationTextbox = document.getElementById("medication-text");
    const otherCheckbox = document.getElementById("other");
    const otherTextbox = document.getElementById("other-textbox");

    const setCigaretteCheckbox = function (event) {
        if (cigaretteNumberTextbox.value > 0) {
            cigaretteNumberCheckbox.checked = true;
        }
        if (cigaretteNumberTextbox.value == "") {
            cigaretteNumberCheckbox.checked = false;
        }
    }
    cigaretteNumberTextbox.addEventListener("keyup", setCigaretteCheckbox);
    cigaretteNumberTextbox.addEventListener("change", setCigaretteCheckbox);

    cigaretteNumberCheckbox.addEventListener("change", (event) => {
        if (!cigaretteNumberCheckbox.checked) {
            cigaretteNumberTextbox.value = "";
        }
    })

    medicationTextbox.addEventListener("keyup", (event) => {
        if (medicationTextbox.value == "") {
            medicationCheckbox.checked = false;
        }
        if (medicationTextbox.value !== "") {
            medicationCheckbox.checked = true;
        }
    })

    otherTextbox.addEventListener("keyup", (event) => {
        if (otherTextbox.value == "") {
            otherCheckbox.checked = false;
        }
        if (otherTextbox.value !== "") {
            otherCheckbox.checked = true;
        }
    })


    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const age = document.getElementById("age").value;
        const boneLoss = document.getElementById("bone-loss").value;
        const gradeRatio = boneLoss / age;

        const molarIncisorChecked = document.getElementById("molar-incisor").checked; // true or false
        const generalisedChecked = document.getElementById("generalised").checked;
        const localisedChecked = document.getElementById("localised").checked;
        const anyExtentChecked = molarIncisorChecked || generalisedChecked || localisedChecked;

        const lessThan10 = document.getElementById("less-than-10").checked;
        const moreThan10 = document.getElementById("more-than-10").checked;
        const anyBOPChecked = lessThan10 || moreThan10;

        const shallowPockets = document.getElementById("shallow-pockets").checked;
        const deepPockets = document.getElementById("deep-pockets").checked;
        const anyPocketsChecked = shallowPockets || deepPockets;

        const yesBleeding = document.getElementById("yes-bleeding").checked;
        const noBleeding = document.getElementById("no-bleeding").checked;
        const notApplicable = document.getElementById("n/a").checked;
        const anyBleedingChecked = yesBleeding || noBleeding || notApplicable;


        let errorMessages = [];
        if (!age) {
            errorMessages.push("- fill in the patient's age")
        }

        if (!boneLoss) {
            errorMessages.push("- fill in the worst site of interproximal bone loss due to periodontitis")
        }

        if (!molarIncisorChecked && !generalisedChecked && !localisedChecked) {
            errorMessages.push("- choose and option for the extent of the periodontal disease")
        }

        if (!lessThan10 && !moreThan10) {
            errorMessages.push("- choose an option for bleeding on probing")
        }

        if (!shallowPockets && !deepPockets) {
            errorMessages.push("- choose an option for the deepest pocket")
        }

        if (!yesBleeding && !noBleeding && !notApplicable) {
            errorMessages.push("- choose an option for if there is bleeding on probing at sites that are 4mm or more")
        }

        if (errorMessages.length > 0) {
            alert(`Please\n${errorMessages.join("\n")}`);
        }


        let extent;
        if (molarIncisorChecked) {
            extent = "Molar-incisor"
        } else if (generalisedChecked) {
            extent = "Generalised"
        } else if (localisedChecked) {
            extent = "Localised"
        }

        let stage;
        if (boneLoss < 15) {
            stage = "Stage I"
        } else if (boneLoss < 33.333333) {
            stage = "Stage II"
        } else if (boneLoss < 66.666666) {
            stage = "Stage III"
        } else {
            stage = "Stage IV"
        }

        let grade;
        if (gradeRatio < 0.5) {
            grade = "Grade A"
        } else if (gradeRatio <= 1) {
            grade = "Grade B"
        } else {
            grade = "Grade C"
        }

        let stability;
        if (lessThan10 && shallowPockets && (noBleeding || notApplicable)) {
            stability = "Currently Stable"
        } else if (moreThan10 && shallowPockets && (noBleeding || notApplicable)) {
            stability = "Currently in Remission"
        } else if (deepPockets || (yesBleeding && shallowPockets)) {
            stability = "Currently Unstable"
        }


        const smokerCheckbox = document.getElementById("smoker");
        const tobaccoProductsCheckbox = document.getElementById("tobacco-products");
        const diabetesCheckbox = document.getElementById("diabetes");
        const stressCheckbox = document.getElementById("stress");
        const familyHistoryCheckbox = document.getElementById("FH");
        const plaqueCheckbox = document.getElementById("plaque");
        const calculusCheckbox = document.getElementById("calculus");
        const denturesCheckbox = document.getElementById("dentures");
        const contactsCheckbox = document.getElementById("contacts");
        const malpositionedCheckbox = document.getElementById("malpositioned");
        const restorationsCheckbox = document.getElementById("restorations");
        const furcationCheckbox = document.getElementById("root-furcation");
        const groovesCheckbox = document.getElementById("grooves");


        let riskFactors = [];
        if (smokerCheckbox.checked) {
            if (cigaretteNumberTextbox.value > 0) {
                riskFactors.push(`smokes ${cigaretteNumberTextbox.value} cigarettes per day`)
            } else {
                riskFactors.push("smokes")
            }
        }
        if (tobaccoProductsCheckbox.checked) riskFactors.push("use of tobacco products other than cigarettes")
        if (diabetesCheckbox.checked) riskFactors.push("sub-optimally controlled diabetes")
        if (stressCheckbox.checked) riskFactors.push("stress")
        if (familyHistoryCheckbox.checked) riskFactors.push("family history/genetic")

        if (medicationCheckbox.checked) {
            if (medicationTextbox.value.length > 0) {
                riskFactors.push(`patient takes ${medicationTextbox.value}`)
            } else {
                riskFactors.push("patient takes gingival overgrowth inducing medication")
            }
        }


        if (plaqueCheckbox.checked) riskFactors.push("plaque")
        if (calculusCheckbox.checked) riskFactors.push("calculus")
        if (denturesCheckbox.checked) riskFactors.push("partial dentures")
        if (contactsCheckbox.checked) riskFactors.push("open contacts")
        if (malpositionedCheckbox.checked) riskFactors.push("malpositioned teeth")
        if (restorationsCheckbox.checked) riskFactors.push("poorly contoured or overhanging restoration(s)")
        if (furcationCheckbox.checked) riskFactors.push("root furcation(s)")
        if (groovesCheckbox.checked) riskFactors.push("root grooves or concavities")

        if (otherCheckbox.checked) {
            if (otherTextbox.value.length > 0) {
                riskFactors.push(`${otherTextbox.value}`)
            }
        }

        if (riskFactors.length == 0) {
            riskFactors.push("no known risk factors")
        }

        if (age && boneLoss && anyExtentChecked && anyBOPChecked && anyPocketsChecked && anyBleedingChecked) {
            diagnosisText.textContent = `${extent} periodontitis - ${stage} - ${grade} - ${stability} - Risk factors: ${riskFactors.join(", ")}`
        }
    });

    const copyButton = document.getElementById("copy-text-button");

    copyButton.addEventListener("click", (event) => {
        const diagnosisTextValue = document.getElementById("diagnosis-text").textContent;
        navigator.clipboard.writeText(diagnosisTextValue);
    });
});
