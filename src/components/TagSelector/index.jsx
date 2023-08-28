import React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')(
    ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
  font-size: 14px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
    ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
        };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
    ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
        };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
    ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function TagSeletor() {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        options: techTags,
        getOptionLabel: (option) => option.title,
    });

    return (
        <Root>
            <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>Select the tags which best describes this blog</Label>
                <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option, index) => (
                        <StyledTag label={option.title} {...getTagProps({ index })} />
                    ))}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })}>
                            <span>{option.title}</span>
                            <CheckIcon fontSize="small" />
                        </li>
                    ))}
                </Listbox>
            ) : null}
        </Root>
    );
}

const techTags = [
    { "title": "Accessibility" },
    { "title": "Agile Methodology" },
    { "title": "AI" },
    { "title": "Algorithms" },
    { "title": "API Design" },
    { "title": "API Development" },
    { "title": "API Gateway" },
    { "title": "API Security" },
    { "title": "AR" },
    { "title": "Artificial Intelligence" },
    { "title": "Augmented Reality (AR)" },
    { "title": "Automation" },
    { "title": "Backend Scalability" },
    { "title": "Back-end Development" },
    { "title": "Back-end Frameworks" },
    { "title": "Big Data Analysis" },
    { "title": "Blockchain Technology" },
    { "title": "CI/CD Pipelines" },
    { "title": "Cloud Computing" },
    { "title": "Cloud Cost Optimization" },
    { "title": "Cloud Governance" },
    { "title": "Cloud Security" },
    { "title": "Cloud-native Applications" },
    { "title": "Code Documentation" },
    { "title": "Code Optimization" },
    { "title": "Code Review" },
    { "title": "Computer Vision" },
    { "title": "Continuous Integration (CI) / Continuous Deployment (CD)" },
    { "title": "Continuous Monitoring" },
    { "title": "Cryptography" },
    { "title": "Cyber Threats" },
    { "title": "Cybersecurity" },
    { "title": "Databases" },
    { "title": "Data Science" },
    { "title": "Data Structures" },
    { "title": "Data Visualization" },
    { "title": "Data Warehousing" },
    { "title": "Deep Learning" },
    { "title": "DevOps" },
    { "title": "DevSecOps (Security in DevOps)" },
    { "title": "Docker Containers" },
    { "title": "Edge AI" },
    { "title": "Edge Computing" },
    { "title": "Embedded Systems" },
    { "title": "Ethical Hacking" },
    { "title": "Explainable AI" },
    { "title": "Front-end Development" },
    { "title": "Front-end Libraries" },
    { "title": "Front-end Performance" },
    { "title": "Full Stack Development" },
    { "title": "Functional Programming" },
    { "title": "Game Development" },
    { "title": "GraphQL" },
    { "title": "HealthTech" },
    { "title": "Internet of Things (IoT)" },
    { "title": "Kubernetes" },
    { "title": "Machine Learning" },
    { "title": "Microfrontends" },
    { "title": "Microservices" },
    { "title": "Microservices Architecture" },
    { "title": "Microservices Security" },
    { "title": "Mobile App Development" },
    { "title": "Mobile Frameworks" },
    { "title": "Mobile Security" },
    { "title": "Natural Language Processing" },
    { "title": "Natural Language Understanding" },
    { "title": "Neural Networks" },
    { "title": "No-Code / Low-Code Development" },
    { "title": "PWA" },
    { "title": "Quantum Algorithms" },
    { "title": "Quantum Computing" },
    { "title": "Quantum Networking" },
    { "title": "RESTful APIs" },
    { "title": "RESTful Web Services" },
    { "title": "Reinforcement Learning" },
    { "title": "Responsive Design" },
    { "title": "Robotics" },
    { "title": "Robotics Process Automation" },
    { "title": "Security" },
    { "title": "Software Architecture" },
    { "title": "Software Engineering" },
    { "title": "Software Testing" },
    { "title": "UI/UX Design" },
    { "title": "UI/UX Prototyping" },
    { "title": "User-Centered Design" },
    { "title": "User Experience Design" },
    { "title": "VR" },
    { "title": "Virtual Reality (VR)" },
    { "title": "Web Development" },
    { "title": "Web Frameworks" },
    { "title": "Wearable App Development" },
    { "title": "Wearable Technology" },
    { "title": "Web Development" },
    { "title": "Wearable Technology" },
    { "title": "Web Frameworks" }
];