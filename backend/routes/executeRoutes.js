const express = require("express");
const router = express.Router();
const vm = require("vm");

router.post("/", async (req, res) => {

    console.log("EXECUTE ROUTE HIT");

    try {

        const { code, input } = req.body;

        console.log("CODE:", code);
        console.log("INPUT:", input);

        if (!code) {
            return res.status(400).json({
                success: false,
                error: "Code is required"
            });
        }

        // Convert input into proper JavaScript value
        let parsedInput = input;

        if (typeof input === "string") {
            try {
                parsedInput = JSON.parse(input);
            } catch (e) {
                // Normal string input
                parsedInput = input;
            }
        }

        console.log("PARSED INPUT:", parsedInput);

        // Find function name from submitted code
        const functionMatch = code.match(
            /function\s+([A-Za-z_$][\w$]*)\s*\(/
        );

        if (!functionMatch) {
            return res.status(400).json({
                success: false,
                error: "No function found in submitted code"
            });
        }

        const functionName = functionMatch[1];

        console.log("FUNCTION NAME:", functionName);

        const sandbox = {
            input: parsedInput,
            result: undefined
        };

        const context = vm.createContext(sandbox);

        const script = new vm.Script(`
            ${code}

            if (typeof ${functionName} === "function") {
                result = ${functionName}(input);
            }
        `);

        script.runInContext(context, {
            timeout: 1000
        });

        console.log("RESULT:", sandbox.result);

        let output = "";

        if (sandbox.result !== undefined) {
            output = JSON.stringify(sandbox.result);
        }

        console.log("SENDING RESPONSE:", output);

        res.json({
            success: true,
            output: output
        });

    } catch (error) {

        console.error("EXECUTION ERROR:", error);

        res.status(400).json({
            success: false,
            error: error.message
        });

    }

});

module.exports = router;