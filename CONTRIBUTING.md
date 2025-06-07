# Contributing to the NeighborLink

Welcome to the open-source NeighborLink project! Contributions are always appreciated, and it's a breeze to get involved. Here's how you can contribute:

## How to Contribute

1. **_Fork the Project:_** Click the "Fork" button at the top-right to create your copy of the project.

2. **_Clone Your Fork:_** Copy the URL from the address bar and run the following command in your terminal.

    ```bash
      git clone https://github.com/AmanDevelops/NeighborLink.git
      cd NeighborLink
    ```
3. **_Set Up the Project:_** Setup the project as per the installation instruction given in `README.md`

4. **_Create a New Branch:_** Create a new branch from the `main` branch to work on your changes.

    ```bash
    git switch -c <new-branch-name>
    ```

5. **_Make Changes:_**  Now it’s time to edit and enhance the project in your branch
   - Open your project in your favorite editor or IDE.  
   - Focus your edits on a **single issue** or feature per branch — makes review smoother.


6. **_Requirements:_** If you are adding any new libraries or dependencies, make sure to update the `requirements.txt` file. To generate the updated `requirements.txt` file, run the following command:

    ```bash
    pip freeze > requirements.txt
    ```
    - The above command will generate the `requirements.txt` file with the appropriate versions of the libraries used in the project without the nested dependencies and metadata.

7. **_Run the Pre-commit hooks:_** The pre-commit hooks are set up to ensure that the code is formatted correctly and passes the linting checks. They are already set up in the project and configured via the `.pre-commit-config.yaml` file. To run the pre-commit hooks, use the following command:
     ```bash
     pre-commit run --all-files
     ```
   - The hooks automatically resolve any issues occurring in the code. So, in the case hook fails, run them again to ensure that the issues are resolved in the previous run.

8. **_Commit Changes:_** Use clear and simple commit messages. Refer: [Conventional Commit Types Guide](https://github.com/3AM-Devs/resources/tree/main/Conventional%20Commit%20Guide)

9. **_Push to Your Fork:_** Send your changes back to your forked repository.

    ```bash
    git push origin <branch-name>
    ```

10. **_Create a Pull Request (PR):_** Open a PR to the `main` branch of `AmanDevelops/NeighborLink`. Describe your changes briefly and why they're awesome. MAKE SURE TO FOLLOW THE PREDEFINED PULL REQUEST TEMPLATE.

11. **_Workflow Checks and PR Review:_** Note that the PR will have to successfully pass all the workflows setup via GitHub action. A successfully checked PR
    will be then reviewed and then merged. Any changes suggested must be met before PR can be merged.

## Additional Notes

- If you are adding any new features, make sure to update the `README.md` file with the new feature details.
- If you are adding a new pre-commit hook, make sure to use the appropriate latest version of the hook when updating the `.pre-commit-config.yaml` file.

## Guidelines

- Have fun! This is an open-source project, and we're all here to learn and enjoy coding together.
- Keep it simple. Make sure your code is easy for others (and your future self) to understand.
- Make sure to use comments wherever needed and update the `README.md` file if necessary.
- Test your changes. Ensure things work as expected.
- Share your thoughts. If you have ideas or questions, open an issue to discuss them.

That's it! Thanks for being part of this project. Every contribution, big or small, makes a difference.

---
