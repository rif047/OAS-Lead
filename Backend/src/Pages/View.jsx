import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    borderRadius: '12px',
};

const capitalizeWords = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
};

const formatValue = (key, value) => {
    if (typeof value === 'boolean') return value ? '✓ Yes' : '✗ No';
    if (key === 'createdOn' && value) return new Date(value).toLocaleString();
    if (key === 'phone') return value.toString();
    return value || 'N/A';
};

const InfoRow = ({ label, value, isEmail = false }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
    }}>
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: '40%' }}>
            {label}
        </Typography>
        {isEmail ? (
            <Link
                href={`mailto:${value}`}
                variant="body2"
                sx={{
                    fontWeight: 500,
                    textAlign: 'right',
                    wordBreak: 'break-word',
                    maxWidth: '55%',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}
            >
                {value}
            </Link>
        ) : (
            <Typography variant="body2" sx={{
                fontWeight: 500,
                textAlign: 'right',
                wordBreak: 'break-word',
                maxWidth: '55%'
            }}>
                {value}
            </Typography>
        )}
    </Box>
);

export default function View({ open, onClose, viewData }) {
    const mainFields = [
        { key: 'fullName', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' },
        { key: 'postcode', label: 'Postcode' },
        { key: 'propertyType', label: 'Property Type' },
        { key: 'buildingRegulations', label: 'Building Regulations' },
        { key: 'architecturalDesigns', label: 'Architectural Designs' },
        { key: 'planningPermission', label: 'Planning Permission' },
        { key: 'whenStart', label: 'Planned Start' },
        { key: 'budget', label: 'Budget Range' },
        { key: 'hearAboutUs', label: 'Referral Source' },
    ];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 600,
                        color: 'text.primary'
                    }}>
                        Client Details
                    </Typography>
                    <CloseIcon
                        onClick={onClose}
                        sx={{
                            cursor: 'pointer',
                            color: 'text.secondary',
                            '&:hover': { color: 'text.primary' }
                        }}
                    />
                </Box>

                {viewData ? (
                    <Box sx={{ pt: 1 }}>
                        {/* Main Information Section */}
                        <Typography variant="overline" sx={{
                            display: 'block',
                            color: 'text.secondary',
                            mb: 2,
                            letterSpacing: 1,
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}>
                            Basic Information
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            {mainFields.map(({ key, label }) => (
                                <InfoRow
                                    key={key}
                                    label={label}
                                    value={formatValue(key, viewData[key])}
                                    isEmail={key === 'email'}
                                />
                            ))}
                        </Box>

                        {/* Extensions Section */}
                        {viewData.selectedExtensions?.length > 0 && (
                            <>
                                <Typography variant="overline" sx={{
                                    display: 'block',
                                    color: 'text.secondary',
                                    mb: 2,
                                    letterSpacing: 1,
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    Proposed Extensions
                                </Typography>

                                <Stack spacing={2} sx={{ mb: 2 }}>
                                    {viewData.selectedExtensions.map((ext, i) => (
                                        <Box key={i} sx={{
                                            p: 2,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            backgroundColor: 'action.hover'
                                        }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                Extension #{i + 1}
                                            </Typography>
                                            <InfoRow label="Floor Type" value={ext.floorType} />
                                            <InfoRow label="Extension Type" value={ext.extensionName} />
                                        </Box>
                                    ))}
                                </Stack>
                            </>
                        )}

                        {/* Terms Section */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            mt: 3,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Chip
                                label={`Terms Accepted: ${viewData.acceptTerms ? 'Yes' : 'No'}`}
                                size="small"
                                color={viewData.acceptTerms ? 'success' : 'default'}
                                variant="outlined"
                            />
                            <Chip
                                label={`Updates Accepted: ${viewData.acceptUpdate ? 'Yes' : 'No'}`}
                                size="small"
                                color={viewData.acceptUpdate ? 'success' : 'default'}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                ) : (
                    <Typography>Loading details...</Typography>
                )}
            </Box>
        </Modal>
    );
}